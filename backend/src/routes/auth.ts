import express from "express";
import * as UserController from "../controllers/auth";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/",requiresAuth, UserController.getAuthenticatedUser);
router.post("/signup", UserController.Signup);
router.post("/login", UserController.Login);
router.post("/logout", UserController.Logout);

export default router;