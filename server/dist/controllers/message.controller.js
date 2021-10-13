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
exports.getMessages = exports.sendMessage = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, receiverId, senderId } = req.body;
        if (!receiverId) {
            throw new http_errors_1.default.NotFound("Need to provide receiverId in body");
        }
        if (!senderId) {
            throw new http_errors_1.default.NotFound("Need to provide senderId in body");
        }
        if (!content) {
            throw new http_errors_1.default.NotFound("Need to provide content in body");
        }
        const Message = yield prisma.message.create({
            data: { content, receiverId, senderId },
        });
        res.status(201).json({
            status: true,
            message: 'Create message successfully',
            data: Message
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.sendMessage = sendMessage;
const getMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { receiverId } = req.body;
        const getMessages = yield prisma.message.findMany({
            where: {
                receiverId: receiverId
            },
            include: {
                receiver: {
                    select: {
                        username: true
                    }
                },
                sender: {
                    select: {
                        username: true
                    }
                }
            }
        });
        res.status(200).json({
            status: true,
            message: 'All messages received',
            data: getMessages,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getMessages = getMessages;
