"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = __importDefault(require("./server.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
/* tslint:disable-next-line */
console.log(accessTokenSecret);
server_js_1.default.listen(PORT, () => {
    /* tslint:disable-next-line */
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
