import type { RequestHandler } from "express";
import type { ObjectSchema } from "joi";
import expressError from "../../utils/expressError";
import joiSchemas from "./joiSchemas";

/* Setup */
const schemas = joiSchemas();

/* Methods */
const natMethods = () => ({
  /* Joi Validator */
  validate: (validation: ObjectSchema, opt?: string) =>
    ((req, res, next) => {
      const params = req.params;
      const query = req.query;
      const body = req.body;
      /* define values to validate */
      const values = opt === "params" ? params : opt === "query" ? query : body;
      const result = validation.validate(values); /* apply validations */
      const { error } = result; /* get error */
      /* validate values */
      if (error) {
        const httpBadRequest = 400;
        const msg = error.details.map((el) => el.message).join(",");
        throw expressError(msg, httpBadRequest);
      }
      /* pass values to next middleware */
      next();
    }) as RequestHandler,
});

/* Validate values */
function fn() {
  /* Private */
  const methods = Object.assign({}, natMethods());

  /* Public: Needs to be instanced because it ain't (req, res) */
  return {
    /* Validate url parameters */
    params: methods.validate(schemas.params, "params"),

    /* Validate query strings */
    ordersIndex: methods.validate(schemas.ordersIndex, "query"),
    trackingIndex: methods.validate(schemas.trackingIndex, "query"),
    templatesIndex: methods.validate(schemas.templatesIndex, "query"),
    mastersIndex: methods.validate(schemas.mastersIndex, "query"),

    /* Validate body */
    trackingCreate: methods.validate(schemas.trackingCreate),
    statusCreate: methods.validate(schemas.statusCreate),
    statusUpdate: methods.validate(schemas.statusUpdate),
  };
}

export default fn;
