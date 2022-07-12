import type { Request, Response } from "express";
import expressError from "../utils/expressError";
import trackingQuery from "../utils/queries/trackingQuery";
import controllerMethods from "./templates/controllerMethods";

/* Variables */
const recordsLimit = 50;
const customStatus = 999;
const httpNotFound = 404;
const httpBadRequest = 400;
const httpCreated = 201;
const msgCreated = { message: `Record Created`, statusCode: httpCreated };

/* Controller */
const controller = () => {
  /* Setup */
  const query = trackingQuery();
  const methods = controllerMethods(query);

  /* Public */
  return {
    /* Show records */
    index: methods.index(recordsLimit),

    /* Create record */
    create: async (req: Request, res: Response) => {
      const { tracking_status_id, status_description } = req.body;
      /* validate custom status */
      if (tracking_status_id == customStatus && !status_description)
        throw expressError("status_description Empty", httpBadRequest);
      /* get status */
      const data = await query.getStatus(tracking_status_id);
      /* validate existence to avoid increasing autoincrement */
      if (!data)
        throw expressError("tracking_status_id Doesn't Exist", httpNotFound);
      const result = await query.addRecord(req.body); /* insert record */
      const response = { ...msgCreated, ...result[0] }; /* build response */
      res.json(response); /* show response */
    },
  };
};

export default controller;
