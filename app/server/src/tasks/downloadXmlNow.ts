import sftpHandler from "../utils/ftpsftp/sftpHandler";
import xmlHandler from "../utils/flowxml/xmlHandler";
import templateHandler from "../utils/flowxml/templateHandler";
import normalHandler from "../utils/flowxml/normalHandler";
import knex from "../db/knex";

/* Variables */
const filesLimit = 30; /* define xml files to download per cycle */

/* Setup */
const sftp = sftpHandler();
const xml = xmlHandler();
const template = templateHandler();
const normal = normalHandler();

/* Main */
const downloadXmlNow = async () => {
  await getXml();
  await flowXml();
  await knexDestroy();
  process.exit(); /* end node script */
};

/* Get XML */
const getXml = async () => {
  try {
    await sftp.handler(filesLimit);
  } catch (error) {
    console.error("downloadNow: ", error);
  }
};

/* Flow XML */
const flowXml = async () => {
  try {
    await xml.handler(); /* record content in db */
    await template.handler(); /* record template in db */
    await normal.handler(); /* record values in db */
  } catch (error) {
    console.error("downloadFlowNow: ", error);
  }
};

/* Close DB Connection */
const knexDestroy = async () => {
  try {
    await knex.destroy();
  } catch (error) {
    console.error("downloadCloseNow: ", error);
  }
};

/* Run task */
downloadXmlNow();
