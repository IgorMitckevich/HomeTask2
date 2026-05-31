import express from "express";
import { adminGuard } from "../../core/middlewares/Guards/admin.guard";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/inputValidationBlogs";
import { postValidation } from "../../core/middlewares/validation/posts/posts.validation";
import { paginationAndSortingValidation } from "../../core/middlewares/validation/query-pagination-sorting.vallidation-middleware";
import { PostSortFields } from "../constants/post-sort-fields";
import { contentValidation } from "../middlewares/contetn-validator";
import {PostsController} from "./posts-controller";
import {container} from "../../composition-root";
import {authentication} from "../../login/routers/login-router";

export const postsRouter = express.Router();

const postsController=container.get(PostsController);
postsRouter
  .get("/", paginationAndSortingValidation(PostSortFields),postsController.findAllPosts.bind(postsController))
  .get(`/:id`, postsController.findPostsById.bind(postsController))
  .post(
    "/",
    adminGuard,
    postValidation,
    inputValidationResultMiddleware,
      postsController.createPosts.bind(postsController)
  )
  .put(
    `/:id`,
    adminGuard,
    postValidation,
    inputValidationResultMiddleware,
      postsController.updatePostsById.bind(postsController),
  )
  .delete(`/:id`, adminGuard, postsController.deletePostsById.bind(postsController))
  .get(
    "/:postId/comments",
    paginationAndSortingValidation(PostSortFields),
      postsController.getCommentsByPostId.bind(postsController)
  )
  .post(
    "/:postId/comments",
      authentication.accessTokenGuard.bind(authentication),
    contentValidation,
    inputValidationResultMiddleware,
      postsController.createComments.bind(postsController)
  );
