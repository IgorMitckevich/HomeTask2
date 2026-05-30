import express, {Request, Response} from "express";
import { findAllBlogs } from "./handlers/findAllBlogs";
import { getBlogById } from "./handlers/findBlogsById";
import { createBlog } from "./handlers/createBlogs";
import { adminGuard } from "../../core/middlewares/Guards/admin.guard";
import { blogsValidation } from "../../core/middlewares/validation/blogs/blogs.validation";
import { deleteBlogsById } from "./handlers/deleteBlogsById";
import { updateBlogById } from "./handlers/updateBlogs";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/inputValidationBlogs";
import { paginationAndSortingValidation } from "../../core/middlewares/validation/query-pagination-sorting.vallidation-middleware";
import { getAllPostsByBlogId } from "./handlers/getsAllPostByBlogId";
import { createPostsByBlogId } from "./handlers/createPostByBlogId";
import {
  postsValidationContent,
  postsValidationShortDescription,
  postsValidationTitle,
} from "../../core/middlewares/validation/posts/posts.validation";
import { BlogSortFields } from "../constants/blog-sort-fields";
import { PostSortFields } from "../../posts/constants/post-sort-fields";
import {BlogInputModel, BlogViewModel} from "../types/blogersModel";
import {ObjectId, WithId} from "mongodb";
import {
  blogController,
  blogsService,
  postsService,
  queryBlogsRepositories,
  queryPostsRepositories
} from "../../common/composition-root";
import {blogsMap} from "./mappers/blogsMap";
import {HttpStatus} from "../../core/https-statuses/httpStatuses";
import {PaginatedOutput} from "../../core/types/Paginated-output";
import {matchedData} from "express-validator";
import {mapBlogsPaginated} from "./mappers/map-blogs-list-paginated-output";
import {PostInputModel} from "../../posts/types/postsModel";
import {postsMap} from "../../posts/routers/mappers/postsMap";
import {PostsQueryInput} from "../../posts/types/posts-query-input";
import {PostsPaginated} from "../../posts/types/postPaginated";
import {mapPostsPaginated} from "../../posts/routers/mappers/map-posts-list-paginated-output";

export const blogsRouter = express.Router();


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
    createPostsByBlogId,
  );
