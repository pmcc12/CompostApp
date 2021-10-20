import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.route";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import serverless from "serverless-http";

dotenv.config();
const app = express();

app.use(cors());

// START HERE
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/api/payment/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
// END HERE

app.use(fileUpload());
app.use(morgan("dev"));
app.use("/api", router);

const handler = serverless(app);

export { app, handler };
