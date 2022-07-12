import _ from "lodash";
import jsonMethods from "../helpers/jsonMethods";
import knex from "../../db/knex";

/* Types */
type propsTypes = {
  nowValues: Object[];
  gmoValues: Object[];
  contentIds: number[];
};
type fieldsTypes = {
  field: string;
  fieldpath: string;
  xml_path_id: number;
}[];
type rowTypes = {
  id: number;
  content: string;
  xml_path_id: number;
  origin_id: number;
};

/* Setup */
const format = jsonMethods();

/* Methods */
const natMethods = (props: propsTypes) => ({
  /* Basic: Build json with fields and values */
  getObj: (
    xml_content_id: number,
    fields: fieldsTypes,
    skeleton: string[],
    json: Object
  ) => {
    let obj = { xml_content_id };
    fields.forEach((elm) => {
      const { field, fieldpath } = elm;
      if (skeleton.includes(fieldpath)) {
        /* get json value without whitespaces */
        const value = _.get(json, fieldpath, null).trim();
        /* build row with parameter and value */
        const prop = { [field]: value };
        obj = { ...obj, ...prop }; /* push row to json */
      }
    });
    return obj; /* return json with fields and values */
  },

  /* Basic: Build ids and values arrays */
  pushObjs: (originId: number, obj: Object, id: number) => {
    const nowOrigin = 1;
    /* push values to now or gmo array */
    originId === nowOrigin
      ? props.nowValues.push(obj)
      : props.gmoValues.push(obj);
    props.contentIds.push(id); /* push id to array */
  },

  /* Basic: Choose between now or gmo to add xml */
  async addLogic() {
    /* addXml now */
    if (props.nowValues.length > 0) {
      const nowTable = "xml_now";
      await this.addXml(nowTable, props.nowValues); /* call insert method */
      props.nowValues = []; /* reset values for next call */
    }
    /* addXml gmo */
    if (props.gmoValues.length > 0) {
      const gmoTable = "xml_gmo";
      await this.addXml(gmoTable, props.gmoValues); /* call insert method */
      props.gmoValues = []; /* reset values for next call */
    }
  },

  /* DB: Get xml_content prepared values */
  getContent: async () =>
    await knex("xml_content as xc")
      .select("xc.id", "xc.content", "xc.xml_path_id", "xr.origin_id")
      .leftJoin("xml_register as xr", "xc.xml_register_id", "xr.id")
      .where({ "xc.prepared": true, "xc.imported": false }),

  /* DB: Get xml_field values */
  getFields: async () =>
    await knex("xml_field").select("field", "fieldpath", "xml_path_id"),

  /* DB: Insert values in xml tables */
  addXml: async (table: string, values: Object[]) =>
    await knex(table).insert(values).onConflict("xml_content_id").ignore(),

  /* DB: Update imported status in xml_content */
  updateContent: async () => {
    await knex("xml_content")
      .update({ imported: true })
      .whereIn("id", props.contentIds)
      .where({ prepared: true, imported: false });
    props.contentIds = []; /* reset values for next call */
  },

  /* Handle: Main handler */
  async handleData() {
    const data = await this.getContent(); /* get xml_content prepared values */
    const fields = await this.getFields(); /* get xml_field values */
    /* handle record independently */
    for (const row of data) await this.handleRow(row, fields);
    /* IMPORTANT: insert values in xml tables */
    await this.addLogic();
    /* IMPORTANT: update imported status in xml_content */
    if (props.contentIds.length > 0) await this.updateContent();
  },

  /* Handle: Get content values into json and add them to array */
  async handleRow(row: rowTypes, fields: fieldsTypes) {
    const { id, content, xml_path_id, origin_id } = row;
    const json = await format.xmlToJson(content); /* convert xml to json */
    const skeleton = format.jsonSkeleton(json); /* get json skeleton */
    /* get json paths */
    const filtered = fields.filter((row) => row.xml_path_id === xml_path_id);
    const obj = this.getObj(id, filtered, skeleton, json); /* filter values */
    this.pushObjs(origin_id, obj, id); /* push values to array */
  },
});

/* Class */
function fn() {
  /* Properties */
  const props = {
    nowValues: [] /* to insert values in xml_now */,
    gmoValues: [] /* to insert values in xml_gmo */,
    contentIds: [] /* to update imported status in xml_content */,
  };

  /* Private */
  const methods = Object.assign(props, natMethods(props));

  /* Public */
  return {
    /* Record values in xml tables */
    handler: async () => await methods.handleData(),
  };
}

export default fn;
