import { RequestHandler } from "express";
import BlogModel from "../models/blogs";
import mongoose from "mongoose";
import createHttpError from "http-errors";

//get blogs
export const getBlogs: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    const blogs = await BlogModel.find({ userId: authenticatedUserId }).exec();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

//get a single blog
export const getBlog: RequestHandler = async (req, res, next) => {
  const { blogId } = req.params;
  const authenticatedUserId = req.session.userId;

  try {
    //checking shape of the id
    if (!mongoose.isValidObjectId(blogId)) {
      throw createHttpError(400, "Invalid Blog Id");
    }

    const blog = await BlogModel.findById(blogId).exec();

    if (!blog) {
      throw createHttpError(404, "Blog not found");
    }

    if (!blog.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot access this blog.");
    }

    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

//create a blog
interface CreateBlogBody {
  title: string;
  content: string;
  tags?: string[];
}

export const createBlog: RequestHandler<
  unknown,
  unknown,
  CreateBlogBody,
  unknown
> = async (req, res, next) => {
  const { title, content, tags } = req.body;
  const authenticatedUserId = req.session.userId;

  try {
    if (!title) {
      throw createHttpError(400, "Blog must have a title");
    }

    const newBlog = await BlogModel.create({
      userId: authenticatedUserId,
      title: title,
      content: content,
      tags: tags,
    });

    res.status(201).json({ message: "New blog created successfully", newBlog });
  } catch (error) {
    next(error);
  }
};

//update a blog
interface updateBlogParams {
  blogId: string;
}

interface UpdateBlogBody {
  title: string;
  content: string;
  tags?: string[];
}

export const updateBlog: RequestHandler<updateBlogParams,unknown,  UpdateBlogBody, unknown> = async (req, res, next) => {
    const {blogId} = req.params;
    const {title: newTitle, content: newContent} = req.body;
    const authenticatedUserId = req.session.userId;

    try {
         //checking shape of the id
    if (!mongoose.isValidObjectId(blogId)) {
        throw createHttpError(400, "Invalid Blog Id");
      }

      if(!newTitle){
        throw createHttpError(400, "Blog must have a title");
      }

      const blog = await BlogModel.findById(blogId).exec();

      if (!blog) {
        throw createHttpError(404, "Blog not found");
      }

      if(!blog.userId.equals(authenticatedUserId)){
        throw createHttpError(401, "You cannot access this blog.")
      }

      blog.title = newTitle;
      blog.content = newContent;

      const updatedBlog = await blog.save();

      res.status(200).json(updatedBlog);
    } catch (error) {
        next(error);
    }
}

//delete blog
export const deleteBlog: RequestHandler = async (req, res, next) => {
    const { blogId } = req.params;
    const authenticatedUserId = req.session.userId;
  
    try {
    
       if (!mongoose.isValidObjectId(blogId)) {
        throw createHttpError(400, "Invalid blog Id");
      }
  
      const blog = await BlogModel.findById(blogId).exec();
  
      if(!blog){
        throw createHttpError(404, "blog not found")
      }
  
      if(!blog.userId.equals(authenticatedUserId)){
        throw createHttpError(401, "You cannot access this blog.")
      }
  
      await blog.deleteOne();
  
      res.status(204).json("Blog deleted.");
    } catch (error) {
      next(error)
    }
  };