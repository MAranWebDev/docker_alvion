import type { Request, Response } from "express";
import expressError from "../utils/expressError";
import ordersQuery from "../utils/queries/ordersQuery";
import controllerMethods from "./templates/controllerMethods";

/* Variables */
const recordsLimit = 30;
const httpNotFound = 404;
const httpOk = 200;
const msgUpdated = { message: `Record Updated`, statusCode: httpOk };

/* Controller */
const controller = (table: string) => {
  /* Setup */
  const query = ordersQuery(table);
  const methods = controllerMethods(query);

  /* Public */
  return {
    /* Show records */
    index: methods.index(recordsLimit),

    /* Show record */
    show: methods.show(),

    /* Close record */
    close: async (req: Request, res: Response) => {
      const id = Number(req.params.id); /* convert id to integer */
      const result = await query.closeRecord(id); /* update record */
      /* validate existence */
      if (result.length === 0)
        throw expressError("Record Not Found or Closed", httpNotFound);
      const response = { ...msgUpdated, ...result[0] }; /* build response */
      res.json(response); /* show response */
    },

    /* Reopen record */
    reopen: async (req: Request, res: Response) => {
      const id = Number(req.params.id); /* convert id to integer */
      const result = await query.openRecord(id); /* update record */
      /* validate existence */
      if (result.length === 0)
        throw expressError("Record Not Found or Open", httpNotFound);
      const response = { ...msgUpdated, ...result[0] }; /* build response */
      res.json(response); /* show response */
    },
  };
};

export default controller;
