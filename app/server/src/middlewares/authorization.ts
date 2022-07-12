import type { RequestHandler } from "express";
import expressError from "../utils/expressError";

/* env */
const { API_TOKEN } = process.env;

/* Variables */
const httpUnauthorized = 401;

/* Validate authorization */
const fn: RequestHandler = (req, res, next) => {
  const { token } = req.headers;
  /* validate token */
  if (token !== API_TOKEN)
    throw expressError("Incorrect header token", httpUnauthorized);
  next();
};

export default fn;
