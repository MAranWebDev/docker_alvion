import { Client } from "basic-ftp";
import { join } from "path";
import { createWriteStream } from "fs";
import ftpsftpMethods from "./ftpsftpMethods";

/* Types */
type propsTypes = {
  host: string;
  user: string;
  password: string;
  downDir: string;
  readDir: string;
};
type fileType = {
  name: string;
};

/* env */
const { FTPSFTP_MODE, GMO_HOST, GMO_USER, GMO_PASS } = process.env;

/* Setup */
const client = new Client(5000); /* number means milliseconds before timeout */

/* Methods */
const natMethods = (props: propsTypes) => ({
  /* Basic: Close ftp connection */
  dropConn: () => client.close(),

  /* Basic: Connect to ftp */
  getConn: async () =>
    await client.access({
      host: props.host,
      user: props.user,
      password: props.password,
    }),

  /* Basic: List only files of a directory */
  listFiles: async () => await client.list(props.readDir),

  /* Basic: Get file date */
  getDate: async (file: fileType) => {
    const filePath = join(props.readDir, file.name);
    return await client.lastMod(filePath); /* return last modification date */
  },

  /* Basic: Download file from remote repo */
  downloadFile: async (fileName: string) => {
    const localPath = join(props.downDir, fileName);
    const dst = createWriteStream(localPath); /* define stream */
    const remotePath = join(props.readDir, fileName);
    await client.downloadTo(dst, remotePath); /* download file as stream */
  },

  /* Basic: Move file between remote folders */
  moveFile: async (fileName: string, toDir: string) => {
    const from = join(props.readDir, fileName);
    const to = join(toDir, fileName);
    await client.rename(from, to); /* rename file from one dir to another */
  },
});

/* Class */
function fn() {
  /* Variables */
  const readDir = FTPSFTP_MODE === "pro" ? "/OUT" : "/QAs/OUT";
  const writeDir = FTPSFTP_MODE === "pro" ? "/ARCHIVE" : "/QAs/OUT_UPDATE";
  const errDir = FTPSFTP_MODE === "pro" ? "/ANULACIONES" : "/QAs/OUT_UPDATE";

  /* Properties */
  const props = {
    host: String(GMO_HOST),
    user: String(GMO_USER),
    password: String(GMO_PASS),
    downDir: join(__dirname, "../../../../temp/xml_in"),
    readDir,
    writeDir,
    errDir,
    originId: 2 /* GMO origin_id in database */,
  };

  /* Private */
  const propMethods = Object.assign(props, natMethods(props));
  const methods = Object.assign(props, ftpsftpMethods(propMethods));

  /* Public */
  return {
    /* Download xml and insert register in db */
    handler: async (limit: number) => await methods.handleFiles(limit),
  };
}

export default fn;
