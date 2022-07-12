import Client from "ssh2-sftp-client";
import { createWriteStream } from "fs";
import { join } from "path";
import ftpsftpMethods from "./ftpsftpMethods";
import fileMethods from "../helpers/fileMethods";

/* Types */
type propsTypes = {
  host: string;
  port: number;
  username: string;
  keyFile: string;
  keyDir: string;
  downDir: string;
  readDir: string;
  upDir: string;
};
type fileType = {
  modifyTime: number;
};

/* env */
const { FTPSFTP_MODE, NOW_PORT, NOW_HOST, NOW_USER, NOW_KEY } = process.env;

/* Setup */
const client = new Client();
const file = fileMethods();

/* Methods */
const natMethods = (props: propsTypes) => ({
  /* Basic: Close sftp connection */
  dropConn: async () => await client.end(),

  /* Basic: Connect to sftp */
  getConn: async () => {
    const privateKey = await file.readFile(props.keyDir, props.keyFile);
    return await client.connect({
      host: props.host,
      port: props.port,
      username: props.username,
      readyTimeout: 5000 /* milliseconds before timeout */,
      retries: 2 /* connection retries */,
      retry_minTimeout: 2000 /* milliseconds before retry */,
      privateKey,
    });
  },

  /* Basic: List xml files of a directory */
  listFiles: async () => await client.list(props.readDir, ".xml"),

  /* Basic: Get file date */
  getDate: (file: fileType) => new Date(file.modifyTime),

  /* Basic: Download file from remote repo */
  downloadFile: async (fileName: string) => {
    const remotePath = join(props.readDir, fileName);
    const localPath = join(props.downDir, fileName);
    const dst = createWriteStream(localPath); /* define stream */
    await client.get(remotePath, dst); /* download file as stream */
  },

  /* Basic: Move file between remote folders */
  moveFile: async (fileName: string, toDir: string) => {
    const from = join(props.readDir, fileName);
    const to = join(toDir, fileName);
    await client.rename(from, to); /* rename file from one dir to another */
  },

  /* Basic: Upload file to remote repo */
  uploadFile: async (buffer: Buffer) => {
    /* get date in name format */
    const date =
      new Date(Date.now())
        .toISOString()
        .replace(/-/g, "")
        .replace(/:/g, "")
        .split(".")[0] + "Z";
    const fileName = `tracking_${date}.xml`; /* build filename */
    const remotePath = join(props.upDir, fileName);
    await client.put(buffer, remotePath); /* upload buffer to remote repo */
  },

  /* Handle: Connect to remote repo and upload file */
  async handleUpload(buffer: Buffer) {
    await this.getConn(); /* connect to remote repo */
    await this.uploadFile(buffer); /* upload file to remote repo  */
    await this.dropConn(); /* disconnect from remote repo */
  },
});

/* Class */
function fn() {
  /* Variables */
  const rootDir = FTPSFTP_MODE === "pro" ? "/PROD" : "/QA";

  /* Properties */
  const props = {
    host: String(NOW_HOST),
    port: Number(NOW_PORT),
    username: String(NOW_USER),
    keyFile: String(NOW_KEY),
    keyDir: join(__dirname, "../../../../private"),
    downDir: join(__dirname, "../../../../temp/xml_in"),
    readDir: join(rootDir, "ENTRADA"),
    writeDir: join(rootDir, "HISTORICO"),
    errDir: join(rootDir, "ERROR"),
    upDir: join(rootDir, "TRACKING/SALIDA"),
    originId: 1 /* NOW origin_id in database*/,
  };

  /* Private */
  const propMethods = Object.assign(props, natMethods(props));
  const methods = Object.assign(props, ftpsftpMethods(propMethods));

  /* Public */
  return {
    /* Upload xml to remote repo */
    upload: async (buffer: Buffer) => await propMethods.handleUpload(buffer),

    /* Download xml and insert register in db */
    handler: async (limit: number) => await methods.handleFiles(limit),
  };
}

export default fn;
