import knex from "../../db/knex";

/* Types */
type propsTypes = {
  table: string;
};
type ordersTypes = {
  limit: number;
  date?: Date;
  imported?: boolean;
  desc?: boolean;
  skip?: number;
};

/* Methods */
const natMethods = (props: propsTypes) => ({
  /* DB: Get records */
  getRecords: async (obj: ordersTypes) => {
    const { limit, date, imported, desc, skip } = obj;
    const order = desc ? "desc" : "asc"; /* define order direction */
    /* return orders */
    return await knex(`${props.table} as xml`)
      .select(
        "xml.*",
        "xc.xml_register_id",
        "xc.xml_path_id",
        "xc.xml_template_id",
        "xr.created_at as xr_created_at",
        "xr.filename as xr_filename",
        "xr.filedate as xr_filedate"
      )
      .leftJoin("xml_content as xc", "xml.xml_content_id", "xc.id")
      .leftJoin("xml_register as xr", "xc.xml_register_id", "xr.id")
      .modify((query) => {
        date && query.where("xr.created_at", ">=", date);
        imported && query.where({ "xml.imported": imported });
        skip && query.offset(skip);
      })
      .orderBy("xml.id", order)
      .limit(limit);
  },

  /* DB: Get record */
  getRecord: async (id: number) =>
    await knex(`${props.table} as xml`)
      .first(
        "xml.*",
        "xc.xml_register_id",
        "xc.xml_path_id",
        "xc.xml_template_id",
        "xr.created_at as xr_created_at",
        "xr.filename as xr_filename",
        "xr.filedate as xr_filedate",
        "xp.path as xp_path",
        "xt.template as xt_template",
        "xc.content as xc_content"
      )
      .leftJoin("xml_content as xc", "xml.xml_content_id", "xc.id")
      .leftJoin("xml_register as xr", "xc.xml_register_id", "xr.id")
      .leftJoin("xml_path as xp", "xc.xml_path_id", "xp.id")
      .leftJoin("xml_template as xt", "xc.xml_template_id", "xt.id")
      .where({ "xml.id": id }),

  /* DB: Update record */
  updateRecord: async (id: number, imported: boolean) =>
    await knex(props.table)
      .update({ imported })
      .returning(["id", "updated_at", "imported"])
      .where({ id, imported: !imported }),
});

/* Class */
function fn(table: string) {
  /* Properties */
  const props = {
    table,
  };

  /* Private */
  const methods = Object.assign(props, natMethods(props));

  /* Public */
  return {
    /* Get records */
    getRecords: async (obj: ordersTypes) => await methods.getRecords(obj),

    /* Get record */
    getRecord: async (id: number) => await methods.getRecord(id),

    /* Close record */
    closeRecord: async (id: number) => await methods.updateRecord(id, true),

    /* Open record */
    openRecord: async (id: number) => await methods.updateRecord(id, false),
  };
}

export default fn;
