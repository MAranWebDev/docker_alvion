import Joi from "./joiExtensions";

/* Variables */
const maxInt = 2000000000; /* max 2*10x0s to avoid db int query error */
const minDate = "2020-01-01"; /* min date to avoid db date error */
const maxDate = "2099-01-01"; /* max date to avoid impossible date */
const options = { convert: false }; /* deactivate convert */

/* Joi Schemas */
const schemas = () => {
  /* Define Validations */
  const {
    valInt,
    valStr,
    valStrLow,
    valStrJob,
    valDate,
    valBool,
    valBoolTrue,
  } = {
    valInt: Joi.number().integer().positive().max(maxInt),
    valStr: Joi.string().trim().max(25).escapeHTML().options(options),
    valStrLow: Joi.string()
      .lowercase()
      .trim()
      .max(25)
      .escapeHTML()
      .options(options),
    valStrJob: Joi.string()
      .uppercase()
      .alphanum()
      .max(15)
      .escapeHTML()
      .options(options),
    valDate: Joi.date().iso().min(minDate).max(maxDate),
    valBool: Joi.boolean(),
    valBoolTrue: Joi.boolean().valid(true),
  };

  /* Public */
  return {
    params: Joi.object({
      id: valInt,
    }),
    ordersIndex: Joi.object({
      date: valDate,
      imported: valBool,
      desc: valBoolTrue,
      skip: valInt,
    }),
    trackingIndex: Joi.object({
      item_visionweb_tracking_id: valStrJob,
      date: valDate,
      imported: valBool,
      group: valBoolTrue,
      desc: valBoolTrue,
      skip: valInt,
    }),
    trackingCreate: Joi.object({
      tracking_status_id: valInt.required(),
      item_tracking_id: valStrJob.required(),
      item_visionweb_tracking_id: valStrJob.required(),
      item_received_at: valDate.required(),
      item_estimated_delivery: valDate,
      status_description: valStr,
    }),
    templatesIndex: Joi.object({
      origin: valInt,
      desc: valBoolTrue,
      skip: valInt,
    }),
    mastersIndex: Joi.object({
      desc: valBoolTrue,
      skip: valInt,
    }),
    statusCreate: Joi.object({
      status: valStrLow.required(),
      id: valInt,
    }),
    statusUpdate: Joi.object({
      status: valStrLow.required(),
    }),
  };
};

export default schemas;
