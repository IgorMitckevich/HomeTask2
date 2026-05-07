import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { QueryCommentsRepositories } from "../../repositories/query-comment-repostitories";
import { CommentInputModel } from "../../types/CommentInputModel";
import { commentsService } from "../../application/comments-service";

export async function updateCommentById(
  req: Request<{ commentId: string }, {}, CommentInputModel>,
  res: Response,
) {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;
    const findComment =
      await QueryCommentsRepositories.getCommentById(commentId);
    if (!findComment) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    if (findComment.commentatorInfo.userId !== userId) {
      res.sendStatus(HttpStatus.Forbidden);
      return;
    }
    const resultOfUpdateComment = await commentsService.updateComment(
      req.body,
      commentId,
    );
    if (!resultOfUpdateComment) {
      res.sendStatus(HttpStatus.BadRequest);
      return;
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
