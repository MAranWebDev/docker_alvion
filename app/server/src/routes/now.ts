import { Router } from "express";
import authorization from "../middlewares/authorization";
import joiValidations from "../middlewares/validations/joiValidations";
import catchAsync from "../middlewares/catchAsync";
import file from "../controllers/file";
import orders from "../controllers/orders";
import tracking from "../controllers/tracking";

/* Variables */
const fileName = "now_order.xml";
const ordersTable = "xml_now";

/* Setup */
const router = Router();
const joi = joiValidations();
const fileController = file(fileName);
const ordersController = orders(ordersTable);
const trackingController = tracking();

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

/* Routes Tracking */
router
  .route("/tracking")
  .get(joi.trackingIndex, catchAsync(trackingController.index))
  .post(
    authorization,
    joi.trackingCreate,
    catchAsync(trackingController.create)
  );

export default router;
