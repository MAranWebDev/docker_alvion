import { Router } from "express";
import joiValidations from "../middlewares/validations/joiValidations";
import catchAsync from "../middlewares/catchAsync";
import templates from "../controllers/templates";

/* Setup */
const router = Router();
const joi = joiValidations();
const templatesController = templates();

/* Routes Template */
router
  .route("/")
  .get(joi.templatesIndex, catchAsync(templatesController.index));
router.route("/:id").get(joi.params, catchAsync(templatesController.show));

export default router;
