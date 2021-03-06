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
exports.getBalance = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getBalance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.userId) {
            throw new http_errors_1.default.NotFound("Need to provide userId in body");
        }
        const user = yield prisma.user.findUnique({
            where: {
                userId: req.body.userId
            }
        });
        if (!user) {
            throw new http_errors_1.default.NotFound("User doesn't exist");
        }
        res.status(200).json({
            status: true,
            message: "Get Balance succesful",
            data: {
                balance: user.balance,
            },
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getBalance = getBalance;
