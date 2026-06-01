import express from "express";
import { adminGuard } from "../../core/middlewares/Guards/admin.guard";
import { blogsValidation } from "../../core/middlewares/validation/blogs/blogs.validation";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/inputValidationBlogs";
import { paginationAndSortingValidation } from "../../core/middlewares/validation/query-pagination-sorting.vallidation-middleware";
import {
  postsValidationContent,
  postsValidationShortDescription,
  postsValidationTitle,
} from "../../core/middlewares/validation/posts/posts.validation";
import { BlogSortFields } from "../constants/blog-sort-fields";
import { PostSortFields } from "../../posts/constants/post-sort-fields";
import {BlogController} from "./Blog-controller";
import {container} from "../../composition-root";

export const blogsRouter = express.Router();

const blogController=container.get(BlogController);

blogsRouter
  .get("/", paginationAndSortingValidation(BlogSortFields), blogController.findAllBlogs.bind(blogController))
  .get(`/:id`, blogController.getBlogById.bind(blogController))
  .post(
    "/",
    adminGuard,
    blogsValidation,
    inputValidationResultMiddleware,
    blogController.createBlog.bind(blogController),
  )
  .put(
    `/:id`,
    adminGuard,
    blogsValidation,
    inputValidationResultMiddleware,
    blogController.updateBlogById.bind(blogController),
  )
  .delete(`/:id`, adminGuard, blogController.deleteBlogsById.bind(blogController))
  .get(
    `/:blogId/posts`,
    paginationAndSortingValidation(PostSortFields),
    blogController.getAllPostsByBlogId.bind(blogController),
  )
  .post(
    `/:blogId/posts/`,
    adminGuard,
    postsValidationShortDescription,
    postsValidationTitle,
    postsValidationContent,
    inputValidationResultMiddleware,
    blogController.createPostsByBlogId.bind(blogController),
  );
