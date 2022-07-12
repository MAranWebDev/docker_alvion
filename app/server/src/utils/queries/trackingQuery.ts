import knex from "../../db/knex";

/* Types */
type propsTypes = {
  table: string;
};
type trackingTypes = {
  limit: number;
  item_visionweb_tracking_id?: string;
  date?: Date;
  imported?: boolean;
  group?: boolean;
  desc?: boolean;
  skip?: number;
};
type createTypes = {
  tracking_status_id: number;
  item_tracking_id: string;
  item_visionweb_tracking_id: string;
  item_received_at?: Date;
  item_estimated_delivery?: Date;
  status_description?: string;
};

/* Methods */
const natMethods = (props: propsTypes) => ({
  /* DB: Get records */
  getRecords: async (obj: trackingTypes) => {
    const {
      limit,
      item_visionweb_tracking_id,
      date,
      imported,
      group,
      desc,
      skip,
    } = obj;
    const order = desc ? "desc" : "asc"; /* define order direction */
    /* return tracking */
    return await knex(`${props.table} as tn`)
      .select("tn.*", "ts.status")
      .leftJoin("tracking_status as ts", "tn.tracking_status_id", "ts.id")
      .modify((query) => {
        item_visionweb_tracking_id &&
          query.where({
            "tn.item_visionweb_tracking_id": item_visionweb_tracking_id,
          });
        date && query.where("tn.created_at", ">=", date);
        imported && query.where({ "tn.imported": imported });
        group && query.orderBy(["tn.item_visionweb_tracking_id"]);
        skip && query.offset(skip);
      })
      .orderBy("tn.id", order) /* order id needs to be after group var */
      .limit(limit);
  },

  /* DB: Get status */
  getStatus: async (id: number) =>
    await knex("tracking_status").first("id").where({ id }),

  /* DB: Insert record */
  addRecord: async (obj: createTypes) => {
    const item_type = "RX"; /* define item_type */
    const customStatus = 999; /* define custom status */
    /* define status_description */
    if (obj.tracking_status_id != customStatus)
      obj.status_description = undefined;
    const values = { item_type, ...obj }; /* build values */
    /* insert and return values */
    return await knex(props.table)
      .insert(values)
      .returning([
        "id",
        "created_at",
        "item_visionweb_tracking_id",
        "tracking_status_id",
      ]);
  },
});

/* Class */
function fn() {
  /* Properties */
  const props = {
    table: "tracking_now",
  };

  /* Private */
  const methods = Object.assign(props, natMethods(props));

  /* Public */
  return {
    /* Get records */
    getRecords: async (obj: trackingTypes) => await methods.getRecords(obj),

    /* Get status */
    getStatus: async (id: number) => await methods.getStatus(id),

    /* Insert record */
    addRecord: async (obj: createTypes) => await methods.addRecord(obj),
  };
}

export default fn;
