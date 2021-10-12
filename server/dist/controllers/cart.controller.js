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
exports.getOrderHistory = exports.getCartOrder = exports.deleteCartItem = exports.buyItem = exports.buyAllItems = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const buyAllItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.buyerId) {
            throw new http_errors_1.default.NotFound("Need to provide buyerId in body");
        }
        const resolvedCart = yield prisma.orderItem.updateMany({
            where: {
                buyerId: req.body.buyerId,
                resolved: false
            },
            data: {
                resolved: true
            }
            //   Showing categories in the return statement
        });
        res.status(201).json({
            status: true,
            message: 'Buy all item in Cart (resolved is true)',
            data: resolvedCart
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.buyAllItems = buyAllItems;
const buyItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.buyerId) {
            throw new http_errors_1.default.NotFound("Need to provide buyerId in body");
        }
        if (!req.body.orderId) {
            throw new http_errors_1.default.NotFound("Need to provide orderId in body");
        }
        const resolvedCart = yield prisma.orderItem.updateMany({
            where: {
                buyerId: req.body.buyerId,
                orderId: req.body.orderId,
                resolved: false
            },
            data: {
                resolved: true
            }
            //   Showing categories in the return statement
        });
        res.status(201).json({
            status: true,
            message: 'Buy an item in Cart (resolved is true)',
            data: resolvedCart
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.buyItem = buyItem;
const getCartOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.buyerId) {
            throw new http_errors_1.default.NotFound("Need to provide buyerId in body");
        }
        const getCartProducts = yield prisma.orderItem.findMany({
            where: {
                buyerId: req.body.buyerId,
                resolved: false
            },
            //   Showing categories in the return statement
        });
        res.status(200).json({
            status: true,
            message: 'All Order in Cart',
            data: getCartProducts
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getCartOrder = getCartOrder;
const getOrderHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.buyerId) {
            throw new http_errors_1.default.NotFound("Need to provide buyerId in body");
        }
        const getCartProducts = yield prisma.orderItem.findMany({
            where: {
                buyerId: req.body.buyerId,
                resolved: true
            },
            //   Showing categories in the return statement
        });
        res.status(200).json({
            status: true,
            message: 'All Order History',
            data: getCartProducts
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getOrderHistory = getOrderHistory;
const deleteCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.orderId) {
            throw new http_errors_1.default.NotFound("Need to provide orderId in body");
        }
        const product = yield prisma.orderItem.delete({
            where: {
                orderId: req.body.orderId
            }
        });
        res.status(202).json({
            status: true,
            message: 'Delete buy-product successful',
            data: product,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.deleteCartItem = deleteCartItem;
