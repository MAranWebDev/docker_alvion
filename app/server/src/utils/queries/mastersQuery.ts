import knex from "../../db/knex";

/* Types */
type propsTypes = {
  table: string;
};
type recordsTypes = {
  limit: number;
  desc?: boolean;
  skip?: number;
};

/* Methods */
const natMethods = (props: propsTypes) => ({
  /* DB: Get records */
  getRecords: async (obj: recordsTypes) => {
    const { limit, desc, skip } = obj;
    const order = desc ? "desc" : "asc"; /* define order direction */
    /* return records */
    return await knex(props.table)
      .select("*")
      .modify((query) => skip && query.offset(skip))
      .orderBy("id", order)
      .limit(limit);
  },

  /* DB: Get record */
  getRecord: async (id: number) =>
    await knex(props.table).first("*").where({ id: id }),

  /* DB: Insert record */
  addRecord: async (values: Object) =>
    await knex(props.table).insert(values).returning("*"),

  /* DB: Update record */
  updateRecord: async (id: number, values: Object) =>
    await knex(props.table).update(values).returning("*").where({ id }),

  /* DB: Delete record */
  deleteRecord: async (id: number) =>
    await knex(props.table).delete().returning("*").where({ id }),
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
    getRecords: async (obj: recordsTypes) => await methods.getRecords(obj),

    /* Get record */
    getRecord: async (id: number) => await methods.getRecord(id),

    /* Insert record */
    addRecord: async (obj: Object) => await methods.addRecord(obj),

    /* Update record */
    updateRecord: async (id: number, obj: Object) =>
      await methods.updateRecord(id, obj),

    /* Delete record */
    deleteRecord: async (id: number) => await methods.deleteRecord(id),
  };
}

export default fn;
