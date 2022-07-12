import trackingHandler from "../utils/trackingHandler";
import knex from "../db/knex";

/* Variables */
const recordsLimit = 500; /* define status to upload per cycle */

/* Setup */
const tracking = trackingHandler();

/* Main */
const uploadXmlNow = async () => {
  await uploadXml();
  await knexDestroy();
  process.exit(); /* end node script */
};

/* Upload XML */
const uploadXml = async () => {
  try {
    await tracking.handler(recordsLimit);
  } catch (error) {
    console.error("uploadNow: ", error);
  }
};

/* Close DB Connection */
const knexDestroy = async () => {
  try {
    await knex.destroy();
  } catch (error) {
    console.error("uploadCloseNow: ", error);
  }
};

/* Run task */
uploadXmlNow();
