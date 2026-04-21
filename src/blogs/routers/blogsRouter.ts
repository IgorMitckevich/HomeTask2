import express from "express";
import { findAllBlogs } from "./handlers/findAllBlogs";
import { getBlogById } from "./handlers/findBlogsById";
import { createBlog } from "./handlers/createBlogs";
import { adminGuard } from "../../core/middlewares/Guards/admin.guard";
import { blogsValidation } from "../../core/middlewares/validation/blogs/blogs.validation";
import { deleteBlogsById } from "./handlers/deleteBlogsById";
import { updateBlogById } from "./handlers/updateBlogs";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/inputValidationBlogs";
import {paginationAndSortingValidation} from "../../core/middlewares/validation/query-pagination-sorting.vallidation-middleware";
import {getAllPostsByBlogId} from "./handlers/getsAllPostByBlogId";
import {createPostsByBlogId} from "./handlers/createPostByBlogId";
import {
  postsValidationContent,
  postsValidationShortDescription, postsValidationTitle,
} from "../../core/middlewares/validation/posts/posts.validation";
import {BlogSortFields} from "../constants/blog-sort-fields";
import {PostSortFields} from "../../posts/constants/post-sort-fields";


export const blogsRouter = express.Router();

blogsRouter
  .get("/",
      paginationAndSortingValidation(BlogSortFields),
      findAllBlogs)
  .get(`/:id`, getBlogById)
  .post(
    "/",
    adminGuard,
    // mongoId,
    blogsValidation,
    inputValidationResultMiddleware,
    createBlog,
  )
  .put(
    `/:id`,
    adminGuard,
      // mongoId,
    blogsValidation,
    inputValidationResultMiddleware,
    updateBlogById,
  )
  .delete(`/:id`,
      adminGuard,
      deleteBlogsById)
    .get(`/:blogId/posts`,
        paginationAndSortingValidation(PostSortFields),
        getAllPostsByBlogId)
    .post(`/:blogId/posts/`,
        adminGuard,
        postsValidationShortDescription,
        postsValidationTitle,
        postsValidationContent,
        inputValidationResultMiddleware,
        createPostsByBlogId);

