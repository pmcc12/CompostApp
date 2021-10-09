import express, { Request, Response } from "express";
import user from "../controllers/auth.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

// Authentication
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/all", user.all);


export default router