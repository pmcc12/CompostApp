import express, { Request, Response } from "express";
import * as authController from "../controllers/auth.controller";
import * as sellController from "../controllers/sell.controller";
import * as buyController from "../controllers/buy.controller";
import * as categoryController from "../controllers/category.controller";
import * as cartController from "../controllers/cart.controller";
import * as messageController from "../controllers/message.controller"
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello sfdasdf");
});

// Authentication
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/all",  authController.all);

// Sell 
router.post("/sell/product", sellController.postSellProduct);
router.post("/sell/getAllProducts",sellController.getSellProducts);

// Category
router.post("/category", categoryController.postCategory);
router.post("/getAllCategories", categoryController.getAllCategories);

// Buy
router.post("/buy/getAllProducts", buyController.getBuyProducts );
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
router.post("/user/message", messageController.sendMessage);
router.post("/user/getMessages", messageController.getMessages)

export default router