import express from "express";

import { contentValidation } from "../../posts/middlewares/contetn-validator";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/inputValidationBlogs";
import {CommentsController} from "./comments-controller";
import {container} from "../../composition-root";
import {authentication} from "../../login/routers/login-router";

export const comments_router = express.Router();

const commentsController:CommentsController=container.get(CommentsController);
comments_router
  .get("/:id", commentsController.getCommentsById.bind(commentsController))
  .put(
    "/:commentId",
      authentication.accessTokenGuard.bind(authentication),
    contentValidation,
    inputValidationResultMiddleware,
    commentsController.updateCommentById.bind(commentsController),
  )
  .delete("/:commentId", authentication.accessTokenGuard.bind(authentication), commentsController.deleteCommentById.bind(commentsController));
