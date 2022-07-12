import knex from "../../db/knex";

/* Types */
type propsTypes = {
  table: string;
};
type recordsTypes = {
  limit: number;
  origin?: number;
  desc?: boolean;
  skip?: number;
};

/* Methods */
const natMethods = (props: propsTypes) => ({
  /* DB: Get records */
  getRecords: async (obj: recordsTypes) => {
    const { limit, origin, desc, skip } = obj;
    const order = desc ? "desc" : "asc"; /* define order direction */
    /* return records */
    return await knex(`${props.table} as xt`)
      .select("xt.id", "xr.origin_id", "o.origin", "xt.template")
      .leftJoin("xml_content as xc", "xt.xml_content_id", "xc.id")
      .leftJoin("xml_register as xr", "xc.xml_register_id", "xr.id")
      .leftJoin("origin as o", "xr.origin_id", "o.id")
      .modify((query) => {
        origin && query.where({ "xr.origin_id": origin });
        skip && query.offset(skip);
      })
      .orderBy("xt.id", order)
      .limit(limit);
  },

  /* DB: Get record */
  getRecord: async (id: number) =>
    await knex(`${props.table} as xt`)
      .first("xt.id", "xr.origin_id", "o.origin", "xt.template")
      .leftJoin("xml_content as xc", "xt.xml_content_id", "xc.id")
      .leftJoin("xml_register as xr", "xc.xml_register_id", "xr.id")
      .leftJoin("origin as o", "xr.origin_id", "o.id")
      .where({ "xt.id": id }),
});

/* Class */
function fn() {
  /* Properties */
  const props = {
    table: "xml_template",
  };

  /* Private */
  const methods = Object.assign(props, natMethods(props));

  /* Public */
  return {
    /* Get records */
    getRecords: async (obj: recordsTypes) => await methods.getRecords(obj),

    /* Get record */
    getRecord: async (id: number) => await methods.getRecord(id),
  };
}

export default fn;
