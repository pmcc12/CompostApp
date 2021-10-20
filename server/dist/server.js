"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const bodyParser = require("body-parser");
// serverless
const serverless_http_1 = __importDefault(require("serverless-http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === "/api/payment/webhook") {
        next();
    }
    else {
        express_1.default.json()(req, res, next);
    }
});
app.use((0, express_fileupload_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/api", index_route_1.default);
// serverless
app.use((req, res) => {
    res.send({ message: "Server is running" });
});
const handler = (0, serverless_http_1.default)(app);
exports.handler = handler;
