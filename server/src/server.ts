import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.route";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
const bodyParser = require("body-parser");
dotenv.config();
const app = express();

app.use(cors());
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/api/payment/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(fileUpload());
app.use(morgan("dev"));
app.use("/api", router);

export default app;
