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
exports.postMessage = exports.getAllMessage = exports.postInbox = exports.getAllInboxes = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllInboxes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const inboxes = yield prisma.messageInbox.findMany({
            where: {
                users: {
                    some: {
                        userId,
                    },
                },
            },
            select: {
                inboxId: true,
                lastUpdated: true,
                users: {
                    select: {
                        userId: true,
                        username: true,
                    },
                },
            },
            orderBy: [
                {
                    lastUpdated: "asc",
                },
            ],
            // select: {
            //     Inboxes: {
            //         select: {
            //             users: {
            //                 select: {
            //                     username: true
            //                 }
            //             }
            //         }
            //     }
            // }
        });
        res.status(200).json({
            status: true,
            message: "All Inboxes from a user",
            data: inboxes,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getAllInboxes = getAllInboxes;
const postInbox = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId1, userId2 } = req.body;
        const inbox = yield prisma.messageInbox.create({
            data: {
                users: {
                    connect: [{ userId: userId1 }, { userId: userId2 }],
                },
            },
        });
        res.status(201).json({
            status: true,
            message: "Inbox created successful",
            data: inbox,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.postInbox = postInbox;
const getAllMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inboxId = parseInt(req.params.inboxId);
        const inbox = yield prisma.messageInbox.findUnique({
            where: { inboxId: inboxId },
            include: {
                Message: true,
            },
        });
        res.status(200).json({
            status: true,
            message: "Get inbox successful",
            data: inbox,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getAllMessage = getAllMessage;
const postMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, inboxId, senderId } = req.body;
        const user = yield prisma.user.findUnique({
            where: {
                userId: senderId,
            },
        });
        let username;
        if (user) {
            username = user.username;
        }
        const message = yield prisma.message.create({
            data: {
                content: content,
                inbox: {
                    connect: { inboxId },
                },
                senderName: username,
                senderId: senderId,
            },
        });
        const updatedInbox = yield prisma.messageInbox.update({
            where: {
                inboxId: inboxId,
            },
            data: {
                lastUpdated: new Date().toISOString(),
            },
        });
        res.status(201).json({
            status: true,
            message: "Inbox created successful",
            data: message,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.postMessage = postMessage;
