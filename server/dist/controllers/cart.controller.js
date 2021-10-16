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
// LEGACY
const buyAllItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.buyerId) {
            throw new http_errors_1.default.NotFound("Need to provide buyerId in body");
        }
        const resolvedCart = yield prisma.orderItem.updateMany({
            where: {
                buyerId: req.body.buyerId,
                resolved: false,
            },
            data: {
                resolved: true,
            },
            //   Showing categories in the return statement
        });
        res.status(201).json({
            status: true,
            message: "Buy all item in Cart (resolved is true)",
            data: resolvedCart,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.buyAllItems = buyAllItems;
// LEGACY
const deleteCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.orderId) {
            throw new http_errors_1.default.NotFound("Need to provide orderId in body");
        }
        const product = yield prisma.orderItem.delete({
            where: {
                orderId: req.body.orderId,
            },
        });
        res.status(202).json({
            status: true,
            message: "Delete buy-product successful",
            data: product,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.deleteCartItem = deleteCartItem;
// LEGACY
const getCartOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.buyerId) {
            throw new http_errors_1.default.NotFound("Need to provide buyerId in body");
        }
        const getCartProducts = yield prisma.orderItem.findMany({
            where: {
                buyerId: req.body.buyerId,
                resolved: false,
            },
            //   Showing categories in the return statement
        });
        res.status(200).json({
            status: true,
            message: "All Order in Cart",
            data: getCartProducts,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getCartOrder = getCartOrder;
// CORE FEATURE
const buyItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, buyerId } = req.body;
        if (!buyerId) {
            throw new http_errors_1.default.NotFound("Need to provide buyerId in body");
        }
        if (!orderId) {
            throw new http_errors_1.default.NotFound("Need to provide orderId in body");
        }
        //  SUBTRACT USER BALANCE & PRODUCT QUANTITY
        // CORE - CHECKING
        // Handle order
        const userOrder = yield prisma.orderItem.findUnique({
            where: {
                orderId: orderId,
            },
        });
        let orderPrice;
        let orderQuantity;
        let productId;
        if (userOrder) {
            orderQuantity = userOrder.orderQuantity;
            orderPrice = userOrder.orderPrice;
            productId = userOrder.productId;
        }
        // Handle user & product
        const user = yield prisma.user.findUnique({
            where: {
                userId: buyerId,
            },
        });
        const product = yield prisma.product.findUnique({
            where: {
                productId: productId,
            },
        });
        let userBalance;
        let productQuantity;
        if (product && user) {
            userBalance = user.balance;
            productQuantity = product.availableQuantity;
        }
        // Security
        if (orderPrice > userBalance) {
            throw new http_errors_1.default.NotAcceptable("User doesn't have enough money");
        }
        if (orderQuantity > productQuantity) {
            throw new http_errors_1.default.NotFound("Product doesn't have enough supply");
        }
        // CORE - UPDATE
        const updatedUser = yield prisma.user.update({
            where: {
                userId: buyerId,
            },
            data: {
                balance: {
                    decrement: orderPrice,
                },
            },
            select: {
                balance: true,
            },
        });
        const updatedProduct = yield prisma.product.update({
            where: {
                productId: productId,
            },
            data: {
                availableQuantity: {
                    decrement: orderQuantity,
                },
            },
            select: {
                availableQuantity: true,
            },
        });
        // CORE - RESOLVE ORDER
        const resolvedOrder = yield prisma.orderItem.updateMany({
            where: {
                buyerId: buyerId,
                orderId: orderId,
                resolved: false,
            },
            data: {
                resolved: true,
            },
        });
        res.status(201).json({
            status: true,
            message: "Resolved orderItem + Subtract money and quantity",
            data: {
                userBalance: updatedUser.balance,
                productQuantity: updatedProduct.availableQuantity,
                orderResolved: true,
            },
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.buyItem = buyItem;
// OPTIONAL
const getOrderHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.buyerId) {
            throw new http_errors_1.default.NotFound("Need to provide buyerId in body");
        }
        const getCartProducts = yield prisma.orderItem.findMany({
            where: {
                buyerId: req.body.buyerId,
                resolved: true,
            },
            //   Showing categories in the return statement
        });
        res.status(200).json({
            status: true,
            message: "All Order History",
            data: getCartProducts,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getOrderHistory = getOrderHistory;
