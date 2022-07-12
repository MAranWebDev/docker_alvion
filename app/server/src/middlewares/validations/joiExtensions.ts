import Joi, { Root } from "joi";
import sanitizeHtml from "sanitize-html";

/* Custom extension */
const extension = (joi: Root) => ({
  type: "string",
  base: joi.string(),
  messages: { "string.escapeHTML": "{{#label}} must not include HTML" },
  rules: {
    escapeHTML: {
      validate(value: string, helpers: any) {
        /* sanitize html */
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        /* validate error */
        if (clean !== value) return helpers.error("string.escapeHTML");
        return clean;
      },
    },
  },
});

/* extend to custom extension */
export default Joi.extend(extension);
