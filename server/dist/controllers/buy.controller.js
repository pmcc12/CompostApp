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
exports.getBuyProductsBySeller = exports.postAddToCart = exports.getBuyProductsByCategory = exports.getBuyProducts = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getBuyProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.userId) {
            throw new http_errors_1.default.NotFound("Need to provide userId in body");
        }
        const products = yield prisma.product.findMany({
            where: {
                sellerId: {
                    not: req.body.userId,
                }
            },
            //   Showing categories in the return statement
            include: {
                categories: {
                    select: {
                        category: true,
                    },
                },
                seller: {
                    select: {
                        username: true,
                        userId: true,
                        location: true
                    }
                }
            },
        });
        res.status(200).json({
            status: true,
            message: 'All buy products',
            data: products,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getBuyProducts = getBuyProducts;
const getBuyProductsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.userId) {
            throw new http_errors_1.default.NotFound("Need to provide userId in body");
        }
        if (!req.body.categoryId) {
            throw new http_errors_1.default.NotFound("Need to provide category in body");
        }
        const products = yield prisma.product.findMany({
            where: {
                sellerId: {
                    not: req.body.userId,
                },
                categories: {
                    some: {
                        category: {
                            categoryId: req.body.categoryId
                        }
                    }
                },
            },
            //   Showing categories in the return statement
            include: {
                categories: {
                    select: {
                        category: true,
                    },
                },
            },
        });
        res.status(200).json({
            status: true,
            message: 'All buy products',
            data: products,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getBuyProductsByCategory = getBuyProductsByCategory;
const postAddToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // we need userId and product id 
    // create orderitem inside where 
    try {
        const { buyerId, productId, orderQuantity } = req.body;
        const product = yield prisma.product.findUnique({
            where: {
                productId: productId,
            }
        });
        // Handle price
        let orderPrice;
        if (product) {
            orderPrice = product.retailPrice * orderQuantity;
        }
        else {
            throw new http_errors_1.default.NotFound("Product doesn't exist");
        }
        // Handle User
        if (product.sellerId === buyerId) {
            throw new http_errors_1.default.NotFound("Buyer can't be the seller");
        }
        // Handle quantity
        if (product.availableQuantity < orderQuantity) {
            throw new http_errors_1.default.NotFound("Available product is not enough");
        }
        const orderItem = yield prisma.orderItem.create({
            data: {
                buyer: {
                    connect: {
                        userId: buyerId
                    }
                },
                product: {
                    connect: {
                        productId: productId
                    }
                },
                orderQuantity: orderQuantity,
                orderPrice: orderPrice,
            },
        });
        res.status(201).json({
            status: true,
            message: 'Add To Cart Successfully',
            data: orderItem,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.postAddToCart = postAddToCart;
const getBuyProductsBySeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.sellerId) {
            throw new http_errors_1.default.NotFound("Need to provide SellerId in body");
        }
        const products = yield prisma.product.findMany({
            where: {
                sellerId: req.body.sellerId,
            },
            //   Showing categories in the return statement
            include: {
                categories: {
                    select: {
                        category: true,
                    },
                },
                seller: {
                    select: {
                        username: true,
                        userId: true,
                        location: true
                    }
                }
            },
        });
        res.status(200).json({
            status: true,
            message: 'All buy products from seller',
            data: products,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getBuyProductsBySeller = getBuyProductsBySeller;
