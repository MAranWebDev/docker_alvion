import type { Request, Response } from "express";
import expressError from "../../utils/expressError";

/* Types */
type propsTypes = {
  getRecords?: any;
  getRecord?: any;
  addRecord?: any;
  updateRecord?: any;
  deleteRecord?: any;
};

/* Variables */
const httpNotFound = 404;
const httpCreated = 201;
const httpOk = 200;
const msgCreated = { message: `Record Created`, statusCode: httpCreated };
const msgUpdated = { message: `Record Updated`, statusCode: httpOk };
const msgDeleted = { message: `Record Deleted`, statusCode: httpOk };

/* Methods */
const methods = (props: propsTypes) => ({
  /* Show records */
  index: (limit: number) => async (req: Request, res: Response) => {
    const values = { limit, ...req.query }; /* build values */
    const data = await props.getRecords(values); /* get records */
    res.json(data); /* show records */
  },

  /* Create record */
  create: () => async (req: Request, res: Response) => {
    const result = await props.addRecord(req.body); /* insert record */
    const response = { ...msgCreated, ...result[0] }; /* build response */
    res.json(response); /* show response */
  },

  /* Show record */
  show: () => async (req: Request, res: Response) => {
    const id = Number(req.params.id); /* convert id to integer */
    const data = await props.getRecord(id); /* get record */
    /* validate existence */
    if (!data) throw expressError("Record Not Found", httpNotFound);
    res.json(data); /* show record */
  },

  /* Update record */
  update: () => async (req: Request, res: Response) => {
    const id = Number(req.params.id); /* convert id to integer */
    const result = await props.updateRecord(id, req.body); /* update record */
    /* validate existence */
    if (result.length === 0)
      throw expressError("Record Not Found", httpNotFound);
    const response = { ...msgUpdated, ...result[0] }; /* build response */
    res.json(response); /* show response */
  },

  /* Delete record */
  delete: () => async (req: Request, res: Response) => {
    const id = Number(req.params.id); /* convert id to integer */
    const result = await props.deleteRecord(id); /* delete record */
    /* validate existence */
    if (result.length === 0)
      throw expressError("Record Not Found", httpNotFound);
    const response = { ...msgDeleted, ...result[0] }; /* build response */
    res.json(response); /* show response */
  },
});

export default methods;
