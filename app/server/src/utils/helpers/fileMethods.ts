import { promisify } from "util";
import { readdir, readFile, unlink, createReadStream } from "fs";
import { extname, join } from "path";

/* Setup */
const readDirContent = promisify(readdir);
const readFileContent = promisify(readFile);
const unlinkFile = promisify(unlink);

/* Methods */
const methods = () => ({
  /* List specific extension files of a directory */
  listFiles: async (dir: string, dirFilter: string) => {
    const files = await readDirContent(dir); /* get directory content */
    /* return files with specific extension */
    return files.filter((file) => extname(file).toLowerCase() === dirFilter);
  },

  /* Read file content */
  readFile: async (fileDir: string, fileName: string) => {
    const filePath = join(fileDir, fileName);
    return await readFileContent(filePath, "utf8"); /* return file content */
  },

  /* Read file content in chunks */
  readStream: (fileDir: string, fileName: string): Promise<any> => {
    const filePath = join(fileDir, fileName);
    const stream = createReadStream(filePath, "utf8"); /* define the stream */
    return new Promise((resolve, reject) => {
      let data = "";
      stream.on("data", (chunk) => (data += chunk)); /* handle stream data */
      stream.on("end", () => resolve(data)); /* end stream */
      stream.on("error", (err) => reject(err)); /* handle stream errors */
    }); /* return file content */
  },

  /* Delete file from a directory */
  deleteFile: async (fileDir: string, fileName: string) => {
    const filePath = join(fileDir, fileName);
    await unlinkFile(filePath); /* delete file from a directory */
  },
});

export default methods;
