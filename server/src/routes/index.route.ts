import express, { Request, Response } from "express";
import * as authController from "../controllers/auth.controller";
import * as sellController from "../controllers/sell.controller";
import * as buyController from "../controllers/buy.controller";
import * as categoryController from "../controllers/category.controller"
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello sfdasdf");
});

// Authentication
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/all", authController.all);

// Sell 
router.post("/sell/product", sellController.postSellProduct);
router.get("/sell/getAllProducts",sellController.getSellProducts);

// Category
router.post("/category", categoryController.postCategory);
router.get("/getAllCategories", categoryController.getAllCategories);

// Buy
router.get("/buy/getAllProducts", buyController.getBuyProducts );
router.get("/buy/products/category", buyController.getBuyProductsByCategory);
router.post("/user/cart/add", buyController.postAddToCart);

export default router