import ftpHandler from "../utils/ftpsftp/ftpHandler";
import xmlHandler from "../utils/flowxml/xmlHandler";
import templateHandler from "../utils/flowxml/templateHandler";
import normalHandler from "../utils/flowxml/normalHandler";
import knex from "../db/knex";

/* Variables */
const filesLimit = 30; /* define xml files to download per cycle */

/* Setup */
const ftp = ftpHandler();
const xml = xmlHandler();
const template = templateHandler();
const normal = normalHandler();

/* Main */
const downloadXmlGmo = async () => {
  await getXml();
  await flowXml();
  await knexDestroy();
  process.exit(); /* end node script */
};

/* Get XML */
const getXml = async () => {
  try {
    await ftp.handler(filesLimit);
  } catch (error) {
    console.error("downloadGmo: ", error);
  }
};

/* Flow XML */
const flowXml = async () => {
  try {
    await xml.handler(); /* record content in db */
    await template.handler(); /* record template in db */
    await normal.handler(); /* record values in db */
  } catch (error) {
    console.error("downloadFlowGmo: ", error);
  }
};

/* Close DB Connection */
const knexDestroy = async () => {
  try {
    await knex.destroy();
  } catch (error) {
    console.error("downloadCloseGmo: ", error);
  }
};

/* Run task */
downloadXmlGmo();
