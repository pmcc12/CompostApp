import express, { Request, Response, NextFunction } from "express";
import * as authController from "../controllers/auth.controller";
import * as sellController from "../controllers/sell.controller";
import * as buyController from "../controllers/buy.controller";
import * as categoryController from "../controllers/category.controller";
import * as cartController from "../controllers/cart.controller";
import * as messageController from "../controllers/message.controller";
import * as stripeController from "../controllers/stripe.controller";
import * as balanceController from "../controllers/balance.controller";
import auth from "../middlewares/auth.middleware";
// Handling Error
import createError from "http-errors";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello sfdasdf");
});

// Authentication
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/all", authController.all);

// Balance
router.post("/user/balance", balanceController.getBalance)

// Sell
router.post("/sell/product", sellController.postSellProduct);
router.post("/sell/getAllProducts", sellController.getSellProducts);

// Category
router.post("/category", categoryController.postCategory);
router.post("/getAllCategories", categoryController.getAllCategories);

// Buy
router.post("/buy/getAllProducts", buyController.getBuyProducts);
router.post(
  "/buy/getAllProductsByseller",
  buyController.getBuyProductsBySeller
);
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
router.get(
  "/user/inbox/:inboxId/getAllMessages",
  messageController.getAllMessage
);
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
router.post(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeController.stripeWebhook
);

// Handling Error
router.use(async (req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound("Route not Found"));
});

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  });
});

export default router;
