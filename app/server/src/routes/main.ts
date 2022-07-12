import { Router } from "express";
import main from "../controllers/main";

/* Setup */
const router = Router();
const mainController = main();

/* Routes Main */
router.route("/").get(mainController.index);

export default router;
