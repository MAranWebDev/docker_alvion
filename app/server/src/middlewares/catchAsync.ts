import type { Request, Response, NextFunction, RequestHandler } from "express";

/* Types */
type funcType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/* Pass express async errors to error handler */
const fn = (func: funcType) =>
  ((req, res, next) => func(req, res, next).catch(next)) as RequestHandler;

export default fn;
