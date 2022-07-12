import jsonMethods from "./helpers/jsonMethods";
import sftpHandler from "../utils/ftpsftp/sftpHandler";
import knex from "../db/knex";

/* Types */
type jsonTypes = {
  item_type: string;
  item_tracking_id: string;
  item_visionweb_tracking_id: string;
  item_received_at: Date;
  item_estimated_delivery: Date;
  status_description: string | undefined;
  tracking_status_id: number;
}[];

/* Setup */
const format = jsonMethods();
const sftp = sftpHandler();

/* Methods */
const natMethods = () => ({
  /* Basic: Format date */
  formatDate: (date: Date) => date.toISOString().split(".")[0] + "Z",

  /* Basic: Build json */
  buildJson(obj: jsonTypes) {
    /* format values */
    const result = obj.map((el) => {
      /* get values in tag format */
      const {
        item_type: Type,
        item_tracking_id: Tracking_Id,
        item_visionweb_tracking_id: Visionweb_Tracking_Id,
        tracking_status_id: Status,
      } = el;
      /* get received tag */
      const Received_at = this.formatDate(el.item_received_at);
      /* get estimated tag */
      const estimated = el.item_estimated_delivery
        ? { Estimated_Delivery: this.formatDate(el.item_estimated_delivery) }
        : null;
      const customStatus = 999; /* define custom status */
      /* get description tag */
      const description =
        Status == customStatus
          ? { STATUS_DESCRIPTION: el.status_description }
          : null;
      /* return row in tag format */
      return {
        ITEM: {
          $: {
            Status,
            Type,
            Tracking_Id,
            Visionweb_Tracking_Id,
            Received_at,
            ...estimated,
          },
          ...description,
        },
      };
    });
    /* return json in tag format */
    return { SUPPLIER: { ACCOUNT: [result] } };
  },

  /* DB: Get not imported tracking values */
  getTracking: async (limit: number) =>
    await knex("tracking_now")
      .select(
        "id",
        "item_type",
        "item_tracking_id",
        "item_visionweb_tracking_id",
        "item_received_at",
        "item_estimated_delivery",
        "status_description",
        "tracking_status_id"
      )
      .where({ imported: false })
      .orderBy("id")
      .limit(limit),

  /* DB: Update imported status */
  updateTracking: async (ids: number[]) =>
    await knex("tracking_now")
      .update({ imported: true })
      .whereIn("id", ids)
      .where({ imported: false }),

  /* Handle: Main handler */
  async handleData(limit: number) {
    const values: [] = [];
    const data = await this.getTracking(limit); /* get tracking values */
    const ids = data.map((el) => el.id); /* get id arrays */
    /* get unique now ids arrays */
    const nowIds = data
      .map((el) => el.item_visionweb_tracking_id)
      .filter((value, index, self) => self.indexOf(value) === index);
    /* handle now id independently */
    for (const nowId of nowIds) this.handleRow(nowId, data, values);
    const jsonArr = values.flat(); /* convert to one json array */
    if (jsonArr.length > 0) await this.handleBatch(jsonArr, ids);
  },

  /* Handle: Filter batch, build json and add them to array */
  handleRow(nowId: string, data: jsonTypes, values: Object[]) {
    /* get batch based on now id */
    const rows = data.filter((el) => el.item_visionweb_tracking_id === nowId);
    const json = this.buildJson(rows); /* build json */
    values.push(json); /* push json to array */
  },

  /* Handle: Upload xml tracking file and update tracking status */
  async handleBatch(json: Object, ids: number[]) {
    const xml = format.jsonToXml(json); /* convert to xml */
    const buffer = Buffer.from(xml); /* convert to buffer */
    await sftp.upload(buffer); /* IMPORTANT: upload file */
    await this.updateTracking(ids); /* IMPORTANT: update tracking status */
  },
});

/* Class */
function fn() {
  /* Private */
  const methods = Object.assign({}, natMethods());

  /* Public */
  return {
    /* Upload xml and update imported status */
    handler: async (limit: number) => await methods.handleData(limit),
  };
}

export default fn;
