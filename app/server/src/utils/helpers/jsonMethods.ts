import { Parser, Builder } from "xml2js";

/* Setup */
const parser = new Parser({ attrkey: "Attr" });
const builder = new Builder({ headless: true, rootName: "VW_TRACKING" });

/* Methods */
const natMethods = () => ({
  /* Basic: Push path element */
  pushFormatRow: (formatRow: string[], elm: string) => {
    /* return push raw path element */
    if (formatRow.length === 0) return formatRow.push(elm);
    /* return push path element with [] */
    if (!isNaN(Number(elm))) return formatRow.push(`[${elm}]`);
    formatRow.push(`.${elm}`); /* push path element with . */
  },

  /* Basic: Get template path */
  getTemplate(
    format: string[],
    formatRow: string[],
    elmValue: [],
    elm: string
  ) {
    /* return continue the cycle */
    if (elm !== "Attr" && typeof elmValue === "object")
      return this.handleFormat(true, elmValue, formatRow, format);
    /* if element is "Attr", remove 1 element from path. Else remove 2 */
    elm === "Attr" ? formatRow.splice(-1) : formatRow.splice(-2);
    this.pushFormat(formatRow, format); /* push element */
  },

  /* Basic: Get skeleton path */
  getSkeleton(format: string[], formatRow: string[], elmValue: []) {
    /* return push element */
    if (typeof elmValue !== "object") return this.pushFormat(formatRow, format);
    /* continue the cycle */
    this.handleFormat(false, elmValue, formatRow, format);
  },

  /* Basic: Push path to final array */
  pushFormat: (formatRow: string[], format: string[]) => {
    const uniqueRow = formatRow.join(""); /* create element path */
    /* if path is unique, push it to format array */
    !format.includes(uniqueRow) && format.push(uniqueRow);
  },

  /* Handle: Get skeleton or template from a json */
  handleFormat(
    option: boolean,
    json: { [keys: string]: any },
    formatRow: string[] = [],
    format: string[] = []
  ) {
    /* Evaluate each element/sub-element in the json */
    for (const elm in json) {
      const cloneRow = [...formatRow]; /* copy row to start clean cycles */
      const elmValue = json[elm]; /* get element value */
      this.pushFormatRow(cloneRow, elm); /* push pash element */
      /* choose skeleton or template cycle */
      option
        ? this.getTemplate(format, cloneRow, elmValue, elm)
        : this.getSkeleton(format, cloneRow, elmValue);
    }
    return format; /* return final skeleton or template */
  },
});

/* Class */
function fn() {
  /* Private */
  const methods = Object.assign({}, natMethods());

  /* Public */
  return {
    /* Convert xml to json */
    xmlToJson: async (xml: string) => await parser.parseStringPromise(xml),

    /* Convert json to xml */
    jsonToXml: (json: Object) => builder.buildObject(json),

    /* Get json skeleton */
    jsonSkeleton: (json: Object) => methods.handleFormat(false, json),

    /* Get json template */
    jsonTemplate: (json: Object) => methods.handleFormat(true, json),
  };
}

export default fn;
