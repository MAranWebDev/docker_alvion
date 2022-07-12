import { join } from "path";
import { minify } from "minify-xml";
import fileMethods from "../helpers/fileMethods";
import knex from "../../db/knex";

/* Types */
type propTypes = {
  readDir: string;
  contentValues: Object[];
  registerIds: number[];
};
type registerTypes = {
  id: number;
  filename: string;
};

/* Setup */
const file = fileMethods();

/* Methods */
const natMethods = (props: propTypes) => ({
  /* Basic: Build object row to add to a db array */
  pushObjs: (xml_register_id: number, content: string) => {
    /* push values to content array */
    props.contentValues.push({ xml_register_id, content });
    /* push values to register ids array */
    props.registerIds.push(xml_register_id);
  },

  /* DB: Get not imported xml_register values */
  getRegisters: async (filenames: string[]) =>
    await knex("xml_register")
      .select("id", "filename", "imported")
      .whereIn("filename", filenames)
      .where({ imported: false }),

  /* DB: Insert array of xml content */
  addContent: async () => {
    await knex("xml_content")
      .insert(props.contentValues)
      .onConflict("xml_register_id")
      .ignore();
    props.contentValues = []; /* reset values for next call */
  },

  /* DB: Update xml register status. Return array with xml names */
  updateRegister: async () => {
    /* update status from false to true and return filename */
    const data = await knex("xml_register")
      .update({ imported: true })
      .returning("filename")
      .whereIn("id", props.registerIds)
      .where({ imported: false });
    props.registerIds = []; /* reset values for next call */
    /* build array of filenames */
    const result = data.map((row) => row.filename);
    return result; /* return array of filenames */
  },

  /* Handle: Main handler */
  async handleData() {
    /* list xml files of readDir */
    const files = await file.listFiles(props.readDir, ".xml");
    /* get not imported xml_register values */
    const data = await this.getRegisters(files);
    /* build array of filenames */
    const names = data.map((row) => row.filename);
    /* IMPORTANT: delete xml files with errors */
    for (const filename of files)
      if (!names.includes(filename))
        await file.deleteFile(props.readDir, filename);
    /* handle each file independently */
    for (const row of data) await this.handleRow(row);
    /* if array has values, handle the whole batch */
    if (props.contentValues.length > 0) await this.handleBatch();
  },

  /* Handle: get content and prepare row */
  async handleRow(row: registerTypes) {
    /* get xml content */
    const xml = await file.readStream(props.readDir, row.filename);
    const xmlContent = minify(xml); /* minify xml content */
    this.pushObjs(row.id, xmlContent); /* add values to arrays */
  },

  /* Handle: Insert content, update status and delete file from temp dir */
  async handleBatch() {
    /* IMPORTANT: insert content batch to db */
    await this.addContent();
    /* IMPORTANT: update register status, get their filenames */
    const fileNames = await this.updateRegister();
    /* IMPORTANT: delete each file from the readDir */
    for (const fileName of fileNames)
      await file.deleteFile(props.readDir, fileName);
  },
});

/* Class */
function fn() {
  /* Properties */
  const props = {
    readDir: join(__dirname, "../../../../temp/xml_in"),
    contentValues: [] /* to insert values in xml_content */,
    registerIds: [] /* to update imported status in xml_register */,
  };

  /* Private */
  const methods = Object.assign(props, natMethods(props));

  /* Public */
  return {
    /* Record content in db, then delete file */
    handler: async () => await methods.handleData(),
  };
}

export default fn;
