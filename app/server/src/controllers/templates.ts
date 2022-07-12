import templatesQuery from "../utils/queries/templatesQuery";
import controllerMethods from "./templates/controllerMethods";

/* Variables */
const recordsLimit = 50;

/* Controller */
const controller = () => {
  /* Setup */
  const query = templatesQuery();
  const methods = controllerMethods(query);

  /* Public */
  return {
    /* Show records */
    index: methods.index(recordsLimit),

    /* Show record */
    show: methods.show(),
  };
};

export default controller;
