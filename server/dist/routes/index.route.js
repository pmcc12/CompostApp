"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("../controllers/auth.controller"));
const sellController = __importStar(require("../controllers/sell.controller"));
const buyController = __importStar(require("../controllers/buy.controller"));
const categoryController = __importStar(require("../controllers/category.controller"));
const cartController = __importStar(require("../controllers/cart.controller"));
const messageController = __importStar(require("../controllers/message.controller"));
const stripeController = __importStar(require("../controllers/stripe.controller"));
const balanceController = __importStar(require("../controllers/balance.controller"));
// Handling Error
const http_errors_1 = __importDefault(require("http-errors"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Hello sfdasdf");
});
// Authentication
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/all", authController.all);
// Balance
router.post("/user/balance", balanceController.getBalance);
// Sell
router.post("/sell/product", sellController.postSellProduct);
router.post("/sell/getAllProducts", sellController.getSellProducts);
// Category
router.post("/category", categoryController.postCategory);
router.post("/getAllCategories", categoryController.getAllCategories);
// Buy
router.post("/buy/getAllProducts", buyController.getBuyProducts);
router.post("/buy/getAllProductsByseller", buyController.getBuyProductsBySeller);
router.post("/buy/products/category", buyController.getBuyProductsByCategory);
router.post("/user/cart/add", buyController.postAddToCart);
// Cart
router.put("/cart/buyAllItems", cartController.buyAllItems);
router.put("/cart/buyItem", cartController.buyItem);
router.delete("/cart/deleteItemFromCart", cartController.deleteCartItem);
router.post("/cart/getCartOrder", cartController.getCartOrder);
router.post("/cart/getOrderHistory", cartController.getOrderHistory);
// Message
router.get("/user/:userId/getAllInboxes", messageController.getAllInboxes);
router.post("/user/postInbox", messageController.postInbox);
router.get("/user/inbox/:inboxId/getAllMessages", messageController.getAllMessage);
router.post("/user/inbox/postMessage", messageController.postMessage);
// Stripe
router.post("/payment/checkout", stripeController.stripeCheckout);
router.get("/payment/testing", (req, res) => {
    res.send(`
    <form action="/api/payment/checkout" method="POST">
            <button type="submit" id="checkout-button">Checkout</button>
        </form>
    `);
});
router.post("/payment/webhook", express_1.default.raw({ type: "application/json" }), stripeController.stripeWebhook);
// Handling Error
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next(new http_errors_1.default.NotFound("Route not Found"));
}));
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message,
    });
});
exports.default = router;
