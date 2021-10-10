"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../utils/jwt"));
const http_errors_1 = __importDefault(require("http-errors"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return next(new http_errors_1.default.Unauthorized('Access token is required'));
    }
    // If headers exist
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(new http_errors_1.default.Unauthorized());
    }
    // If token exist
    yield jwt_1.default.verifyAccessToken(token).then(user => {
        req.user = user;
        next();
    }).catch(e => {
        next(new http_errors_1.default.Unauthorized(e.message));
    });
});
exports.default = auth;
