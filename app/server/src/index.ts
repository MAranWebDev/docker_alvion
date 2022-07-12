import express, { ErrorRequestHandler } from "express";
import expressError from "./utils/expressError";
import mainRouter from "./routes/main";
import mastersRouter from "./routes/masters";
import templatesRouter from "./routes/templates";
import nowRouter from "./routes/now";
import gmoRouter from "./routes/gmo";

/* Variables */
const PORT = 5000;

/* Setup */
const app = express();
app.use(express.json()); /* accept json */
app.use(express.urlencoded({ extended: true })); /* accept nested query */

/* Express Routes */
app.use("/", mainRouter);
app.use("/masters", mastersRouter);
app.use("/templates", templatesRouter);
app.use("/now", nowRouter);
app.use("/gmo", gmoRouter);

/* Express Not Found */
app.all("*", (req, res, next) => next(expressError("Page Not Found", 404)));

/* Express Error Handler */
app.use(((err, req, res, next) => {
  if (!err.message) err.message = "Something Went Wrong"; /* message */
  const { statusCode = 500 } = err; /* status code */
  /* build response */
  const response = { err: { message: err.message, statusCode, ...err } };
  res.status(statusCode).json(response); /* show response */
}) as ErrorRequestHandler);

/* Express Listen */
app.listen(PORT, () => console.log(`Listening: ${PORT}`));
