import _ from "lodash";
import { minify } from "minify-xml";
import { join } from "path";
import jsonMethods from "./helpers/jsonMethods";
import fileMethods from "./helpers/fileMethods";

/* Types */
type propsTypes = {
  readDir: string;
  fileName: string;
};

/* Setup */
const format = jsonMethods();
const file = fileMethods();

/* Methods */
const natMethods = (props: propsTypes) => ({
  /* Basic: Convert xml to json format */
  getJson: async () => {
    /* read xml file */
    const xml = await file.readStream(props.readDir, props.fileName);
    const xmlMinified = minify(xml); /* minifie xml */
    return await format.xmlToJson(xmlMinified); /* return xml in json format */
  },

  /* Basic: Build json with paths and values */
  getValues: (skeleton: string[], json: Object) => {
    let values = {};
    skeleton.forEach((element) => {
      /* get json value without whitespaces */
      const value = _.get(json, element, null).trim();
      const obj = { [element]: value }; /* build row with parameter and value */
      values = { ...values, ...obj }; /* push row to json */
    });
    return values; /* return json with paths and values */
  },

  /* Handle: Get json skeleton and values */
  async handleValues() {
    const json = await this.getJson(); /* get json */
    const skeleton = format.jsonSkeleton(json); /* get json skeleton */
    return this.getValues(skeleton, json); /* return json skeleton and values */
  },

  /* Handle: Get json skeleton */
  async handleSkeleton() {
    const json = await this.getJson(); /* get json */
    return format.jsonSkeleton(json); /* return json skeleton */
  },

  /* Handle: Get json template */
  async handleTemplate() {
    const json = await this.getJson(); /* get json */
    return format.jsonTemplate(json); /* return json template */
  },
});

/* Class */
function fn(fileName: string) {
  /* Properties */
  const props = {
    readDir: join(__dirname, "../../../temp/xml_sample"),
    fileName,
  };

  /* Private */
  const methods = Object.assign(props, natMethods(props));

  /* Public */
  return {
    /* Get xml in json format */
    json: async () => await methods.getJson(),

    /* Get json skeleton and values */
    values: async () => await methods.handleValues(),

    /* Get json skeleton */
    skeleton: async () => await methods.handleSkeleton(),

    /* Get json template */
    template: async () => await methods.handleTemplate(),
  };
}

export default fn;
