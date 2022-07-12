import { Router } from "express";
import authorization from "../middlewares/authorization";
import joiValidations from "../middlewares/validations/joiValidations";
import catchAsync from "../middlewares/catchAsync";
import file from "../controllers/file";
import orders from "../controllers/orders";

/* Variables */
const sampleFile = "gmo_order.xml";
const ordersTable = "xml_gmo";

/* Setup */
const router = Router();
const joi = joiValidations();
const fileController = file(sampleFile);
const ordersController = orders(ordersTable);

/* Routes Sample File */
router.route("/sample").get(catchAsync(fileController.index));
router.route("/sample-values").get(catchAsync(fileController.showValues));
router.route("/sample-skeleton").get(catchAsync(fileController.showSkeleton));
router.route("/sample-template").get(catchAsync(fileController.showTemplate));

/* Routes Orders */
router
  .route("/orders")
  .get(joi.ordersIndex, catchAsync(ordersController.index));
router.route("/orders/:id").get(joi.params, catchAsync(ordersController.show));
router
  .route("/orders/:id/close")
  .post(authorization, joi.params, catchAsync(ordersController.close));
router
  .route("/orders/:id/reopen")
  .post(authorization, joi.params, catchAsync(ordersController.reopen));

export default router;
