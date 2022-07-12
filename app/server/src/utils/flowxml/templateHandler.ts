import _ from "lodash";
import jsonMethods from "../helpers/jsonMethods";
import knex from "../../db/knex";

/* Types */
type propsTypes = {
  templateValues: { template: string[] }[];
  templatesPg: string[];
  objValues: objValuesTypes;
};
type objValuesTypes = {
  xml_content_id: number;
  xml_path_id: number;
  template: string;
}[];
type templateTypes = {
  id: number;
  template: string[];
}[];
type contentValuesTypes = {
  xml_content_id: number;
  xml_template_id: number;
  xml_path_id: number;
};
type rowTypes = {
  id: number;
  origin_id: number;
  content: string;
};

/* Setup */
const format = jsonMethods();

/* Methods */
const natMethods = (props: propsTypes) => ({
  /* Basic: Get path ids */
  getPathId(originId: number, json: Object) {
    const gmoOrigin = 2;
    const nowPath = 1;
    /* return path id for now or gmo */
    return originId === gmoOrigin ? this.getGmoPathId(json) : nowPath;
  },

  /* Basic: Get gmo path id */
  getGmoPathId: (json: Object) => {
    /* gmo mount rule */
    const gmoMountPath = "ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0]";
    const gmoMount = 3;
    const gmoNoMount = 2;
    const mountValue = _.get(json, gmoMountPath, null); /* check mount rule */
    return mountValue ? gmoMount : gmoNoMount; /* get mount or not mount */
  },

  /* Basic: Push values to arrays */
  pushObjs: (
    template: string[],
    xml_content_id: number,
    xml_path_id: number
  ) => {
    const arr = props.templateValues.map((row) => row.template.join());
    const tempStr = template.join();
    /* prepare templateValues values */
    const obj = { xml_content_id, template };
    const tempPg = `{${tempStr}}`; /* prepare templatesPg values*/
    /* prepare objValues values */
    const objStr = { xml_content_id, template: tempStr, xml_path_id };
    /* push to templateValues array */
    !arr.includes(tempStr) && props.templateValues.push(obj);
    /* push to templatesPg array */
    !props.templatesPg.includes(tempPg) && props.templatesPg.push(tempPg);
    /* push to objValues array */
    props.objValues.push(objStr);
  },

  /* Basic: Filter templateValues with unique templates */
  filterTemplateValues: (templates: templateTypes) => {
    /* prepare array with one template per row */
    const arr = templates.map((row) => row.template.join());
    /* update templateValues with unique templates */
    props.templateValues = props.templateValues.filter(
      (obj) => !arr.includes(obj.template.join())
    );
  },

  /* Basic: Build array of values to update xml_content */
  getContentValues: (templateIds: templateTypes) => {
    const values: contentValuesTypes[] = [];
    /* prepare array of templates with their ids */
    const data = templateIds.map((row) => ({
      xml_template_id: row.id,
      template: row.template.join(),
    }));
    /* build array of objects with values to update in xml_content */
    props.objValues.forEach((obj) => {
      /* search if template exist */
      const template = data.find((row) => row.template === obj.template);
      if (template) {
        /* get values from joined object */
        const { xml_template_id, xml_content_id, xml_path_id } = {
          ...obj,
          ...template,
        };
        /* push values to array */
        values.push({ xml_template_id, xml_content_id, xml_path_id });
      }
    });
    props.objValues = []; /* reset values for next call */
    return values; /* return array of objects */
  },

  /* DB: Get xml content values */
  getContent: async () =>
    await knex("xml_content as xc")
      .select("xc.id", "xc.content", "xr.origin_id")
      .leftJoin("xml_register as xr", "xc.xml_register_id", "xr.id")
      .where(function () {
        this.whereNull("xc.xml_template_id").orWhereNull("xc.xml_path_id");
      })
      .where({ "xc.prepared": false }),

  /* DB: Get templates and id */
  getTemplate: async () =>
    await knex("xml_template")
      .select("template", "id")
      .whereIn("template", props.templatesPg),

  /* DB: Insert templates values */
  addTemplate: async () => {
    await knex("xml_template")
      .insert(props.templateValues)
      .onConflict("template")
      .ignore();
    props.templateValues = [] /* reset values for next call */;
  },

  /* DB: Update xml_content with template and path id */
  updateContent: async (row: contentValuesTypes) =>
    await knex("xml_content")
      .update({
        xml_template_id: row.xml_template_id,
        xml_path_id: row.xml_path_id,
      })
      .where(function () {
        this.whereNull("xml_template_id").orWhereNull("xml_path_id");
      })
      .where({ prepared: false, id: row.xml_content_id }),

  /* DB: Update prepared status from false to true */
  updateContentPrepared: async () =>
    await knex("xml_content")
      .update({ prepared: true })
      .whereNotNull("xml_template_id")
      .whereNotNull("xml_path_id")
      .where({ prepared: false }),

  /* Handle: Main handler */
  async handleData() {
    const data = await this.getContent(); /* get xml content values */
    /* handle record independently */
    for (const row of data) await this.handleRow(row);
    /* if array has values, handle whole batch */
    if (props.templateValues.length > 0) await this.handleBatch();
    /* IMPORTANT: Update prepared status */
    await this.updateContentPrepared();
  },

  /* Handle: Convert content to json and add row to array */
  async handleRow(row: rowTypes) {
    const { content, origin_id, id } = row;
    /* convert xml content to json */
    const json = await format.xmlToJson(content);
    const template = format.jsonTemplate(json); /* get json template */
    const xmlPathId = this.getPathId(origin_id, json); /* get path id */
    this.pushObjs(template, id, xmlPathId); /* push values to array */
  },

  /* Handle: Insert templates, update xml_content values */
  async handleBatch() {
    const templates = await this.getTemplate(); /* get templates and ids */
    /* filter templateValues with unitque templates */
    this.filterTemplateValues(templates);
    /* IMPORTANT: Insert unique templates */
    if (props.templateValues.length > 0) await this.addTemplate();
    const templateIds = await this.getTemplate(); /* get templates ids */
    props.templatesPg = [] /* reset values for next call */;
    /* get values to update xml_content */
    const contentValues = this.getContentValues(templateIds);
    /* IMPORTANT: Update xml_content id and path values */
    for (const row of contentValues) await this.updateContent(row);
  },
});

/* Class */
function fn() {
  /* Properties */
  const props = {
    templateValues: [] /* to insert unique values in xml_template */,
    templatesPg: [] /* to get ids from all xml_template */,
    objValues: [] /* to prepare update values in xml_content */,
  };

  /* Private */
  const methods = Object.assign(props, natMethods(props));

  /* Public */
  return {
    /* Record templates in xml_templates and update values in xml_content */
    handler: async () => await methods.handleData(),
  };
}

export default fn;
