import express, { Request, Response } from "express";
import * as authController from "../controllers/auth.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

// Authentication
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/all", authController.login);


export default router