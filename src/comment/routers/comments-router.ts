import express from "express";
import { getCommentsById } from "./handlers/get-comments";
import { accessTokenGuard } from "../../login/middlewares/authorization";
import { updateCommentById } from "./handlers/update-comments-byId";
import { contentValidation } from "../../posts/middlewares/contetn-validator";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/inputValidationBlogs";
import { deleteCommentById } from "./handlers/delete-comment-byId";

export const comments_router = express.Router();

comments_router
  .get("/:id", getCommentsById)
  .put(
    "/:commentId",
    accessTokenGuard,
    contentValidation,
    inputValidationResultMiddleware,
    updateCommentById,
  )

  .delete("/:commentId", accessTokenGuard, deleteCommentById);
