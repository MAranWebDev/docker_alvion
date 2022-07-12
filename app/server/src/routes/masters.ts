import { Router } from "express";
import authorization from "../middlewares/authorization";
import joiValidations from "../middlewares/validations/joiValidations";
import catchAsync from "../middlewares/catchAsync";
import masters from "../controllers/masters";

/* Setup */
const router = Router();
const joi = joiValidations();
const originsController = masters("origin");
const pathsController = masters("xml_path");
const fieldsController = masters("xml_field");
const statusController = masters("tracking_status");

/* Routes Origins */
router
  .route("/origins")
  .get(joi.mastersIndex, catchAsync(originsController.index));
router
  .route("/origins/:id")
  .get(joi.params, catchAsync(originsController.show));

/* Routes XML Paths */
router
  .route("/xml-paths")
  .get(joi.mastersIndex, catchAsync(pathsController.index));
router
  .route("/xml-paths/:id")
  .get(joi.params, catchAsync(pathsController.show));

/* Routes XML Fields */
router
  .route("/xml-fields")
  .get(joi.mastersIndex, catchAsync(fieldsController.index));
router
  .route("/xml-fields/:id")
  .get(joi.params, catchAsync(fieldsController.show));

/* Routes Tracking Status */
router
  .route("/tracking-status")
  .get(joi.mastersIndex, catchAsync(statusController.index))
  .post(authorization, joi.statusCreate, catchAsync(statusController.create));
router
  .route("/tracking-status/:id")
  .get(joi.params, catchAsync(statusController.show))
  .patch(
    authorization,
    joi.params,
    joi.statusUpdate,
    catchAsync(statusController.update)
  )
  .delete(authorization, joi.params, catchAsync(statusController.delete));

export default router;
