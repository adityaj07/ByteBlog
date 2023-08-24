import express from "express";
import * as UserController from "../controllers/auth";

const router = express.Router();

router.post("/signup", UserController.Signup);
router.post("/login", UserController.Login);
router.post("/logout", UserController.Logout);

export default router;