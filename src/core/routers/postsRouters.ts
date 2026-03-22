import express from "express";
import { adminGuard } from "../middlewares/admin.guard";
import { inputValidationResultMiddleware } from "../middlewares/validation/inputValidationBlogs";
import { findAllPosts } from "./handlers/posts/findAllPosts";
import { findPostsById } from "./handlers/posts/findPostsById";
import { updatePostsById } from "./handlers/posts/updatePosts";
import { createPosts } from "./handlers/posts/createPosts";
import { deletePostsById } from "./handlers/posts/deletePostsById";
import { postValidation } from "../middlewares/validation/posts/posts.validation";

export const postsRouter = express.Router();

postsRouter
  .get("/", findAllPosts)
  .get(`/:id`, findPostsById)
  .post(
    "/",
    adminGuard,
    postValidation,
    inputValidationResultMiddleware,
    createPosts,
  )
  .put(
    `/:id`,
    adminGuard,
    postValidation,
    inputValidationResultMiddleware,
    updatePostsById,
  )
  .delete(`/:id`, adminGuard, deletePostsById);
