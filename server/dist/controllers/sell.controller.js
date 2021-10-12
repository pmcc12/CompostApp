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
exports.getSellProducts = exports.postSellProduct = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const postSellProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, categoryId } = req.body;
        delete req.body.categoryId;
        delete req.body.userId;
        const product = yield prisma.product.create({
            data: Object.assign({ seller: {
                    connect: {
                        userId: userId
                    }
                }, categories: {
                    create: [
                        { category: { connect: { categoryId: categoryId } } },
                    ]
                } }, req.body),
            //   Showing categories in the return statement
            include: {
                categories: {
                    select: {
                        category: true,
                    },
                },
            },
        });
        res.status(201).json({
            status: true,
            message: "Sell product created successful",
            data: product
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.postSellProduct = postSellProduct;
const getSellProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.userId) {
            throw new http_errors_1.default.NotFound("Need to provide userId in body");
        }
        const products = yield prisma.product.findMany({
            where: {
                sellerId: req.body.userId,
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
            message: 'All sell products',
            data: products,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.getSellProducts = getSellProducts;
