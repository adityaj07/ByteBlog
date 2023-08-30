import express from "express";
import * as BlogController from "../controllers/blog";

const router = express.Router();

router.get("/",BlogController.getBlogs);
router.post("/:blogId", BlogController.getBlog);
router.post("/", BlogController.createBlog);
router.post("/:blogId", BlogController.updateBlog);
router.post("/:blogId", BlogController.deleteBlog);

export default router;