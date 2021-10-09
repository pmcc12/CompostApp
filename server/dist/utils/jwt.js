"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
exports.default = {
    signAccessToken(payload) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign({ payload }, accessTokenSecret, {}, (err, token) => {
                if (err) {
                    reject(new http_errors_1.default.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, payload) => {
                if (err) {
                    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                    return reject(new http_errors_1.default.Unauthorized(message));
                }
                resolve(payload);
            });
        });
    }
};
// From
// https://blog.logrocket.com/crafting-authentication-schemes-with-prisma-in-express/
