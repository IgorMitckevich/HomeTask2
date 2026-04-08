import express from "express";
import { adminGuard } from "../../core/middlewares/admin.guard";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/inputValidationBlogs";
import { findAllPosts } from "./handlers/findAllPosts";
import { findPostsById } from "./handlers/findPostsById";
import { updatePostsById } from "./handlers/updatePosts";
import { createPosts } from "./handlers/createPosts";
import { deletePostsById } from "./handlers/deletePostsById";
import { postValidation } from "../../core/middlewares/validation/posts/posts.validation";
import {
  paginationAndSortingValidation
} from "../../core/middlewares/validation/query-pagination-sorting.vallidation-middleware";
import {sortDirections} from "../../core/types/SortDirections";
import {PostSortFields} from "../constants/post-sort-fields";


export const postsRouter = express.Router();

postsRouter
  .get("/",
      paginationAndSortingValidation(PostSortFields),
      findAllPosts)
  .get(`/:id`,
      findPostsById)
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
  .delete(`/:id`,
      adminGuard,
      deletePostsById);

