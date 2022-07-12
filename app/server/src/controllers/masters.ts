import mastersQuery from "../utils/queries/mastersQuery";
import controllerMethods from "./templates/controllerMethods";

/* Variables */
const recordsLimit = 50;

/* Controller */
const controller = (table: string) => {
  /* Setup */
  const query = mastersQuery(table);
  const methods = controllerMethods(query);

  /* Public */
  return {
    /* Show records */
    index: methods.index(recordsLimit),

    /* Create record */
    create: methods.create(),

    /* Show record */
    show: methods.show(),

    /* Update record */
    update: methods.update(),

    /* Delete record */
    delete: methods.delete(),
  };
};

export default controller;
