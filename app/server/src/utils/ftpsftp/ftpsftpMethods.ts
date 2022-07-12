import knex from "../../db/knex";

/* Types */
type promiseType = () => Promise<any>;
type fileTypes = {
  name: string;
  modifyTime: number /* mandatory for sftpHandler class */;
};
type propsTypes = {
  originId: number;
  errDir: string;
  writeDir: string;
  getConn: promiseType;
  listFiles: promiseType;
  dropConn: promiseType;
  getDate: (arg: fileTypes) => any;
  downloadFile: (arg: string) => Promise<any>;
  moveFile: (arg1: string, arg2: string) => Promise<any>;
};
type valuesTypes = {
  filename: string;
}[];

/* Methods */
const methods = (props: propsTypes) => ({
  /* Basic: Build object row to add to a db array */
  getObj: (filename: string, filedate: Date) => ({
    origin_id: props.originId,
    filename,
    filedate,
  }),

  /* Basic: Rename file to chosen remote directory */
  moveToDir: async (fileNames: string[], fileName: string) => {
    const { moveFile, writeDir, errDir } = props;
    /* if filename inserted in db, return move file to historic folder */
    if (fileNames.includes(fileName)) return await moveFile(fileName, writeDir);
    await moveFile(fileName, errDir); /* move file to error folder */
  },

  /* DB: Insert xml registers in db. Return array with xml names */
  addRegister: async (values: Object[]) => {
    /* insert data in xml_register and return objects with filename */
    const data = await knex("xml_register")
      .insert(values)
      .returning("filename")
      .onConflict("filename")
      .ignore();
    /* build array of filenames */
    const result = data.map((row) => row.filename);
    return result; /* return array of filenames */
  },

  /* Handle: Main handler */
  async handleFiles(limit: number) {
    const { getConn, listFiles, dropConn } = props;
    const values: valuesTypes = [];
    await getConn(); /* connect to remote repo */
    const list = await listFiles(); /* list xml files in remote repo */
    /* define batch of files to work */
    const listLength = limit > list.length ? list.length : limit;
    /* handle each file independently */
    for (let i = 0; i < listLength; i++) await this.handleFile(list[i], values);
    /* if array has values, handle the whole batch */
    if (values.length > 0) await this.handleBatch(values);
    await dropConn(); /* disconnect from remote repo */
  },

  /* Handle: Download xml and add values to array */
  async handleFile(file: fileTypes, values: valuesTypes) {
    const filedate = await props.getDate(file); /* get file date */
    /* IMPORTANT: download file */
    await props.downloadFile(file.name);
    /* prepare object to insert in db */
    const obj = this.getObj(file.name, filedate);
    values.push(obj); /* push object to array that will be insterted into db */
  },

  /* Handle: Insert register and move files to their destination directory */
  async handleBatch(values: valuesTypes) {
    /* IMPORTANT: insert all values, then get their filenames */
    const fileNames = await this.addRegister(values);
    /* IMPORTANT: handle file independently. move to their destination */
    for (const value of values) await this.moveToDir(fileNames, value.filename);
  },
});

export default methods;
