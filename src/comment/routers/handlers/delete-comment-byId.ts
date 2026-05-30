import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { queryCommentsRepositories } from "../../../common/composition-root";
import { commentsService } from "../../../common/composition-root";

export async function deleteCommentById(
  req: Request<{ commentId: string }>,
  res: Response,
) {
  try {
    const commentId = req.params.commentId;
    const userId = req.user!.id;
    const findComment =
      await queryCommentsRepositories.getCommentById(commentId);
    if (!findComment) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    if (findComment.commentatorInfo.userId !== userId) {
      res.sendStatus(HttpStatus.Forbidden);
      return;
    }
    const deletedResult = await commentsService.deleteComment(commentId);
    if (!deletedResult) {
      res.sendStatus(HttpStatus.BadRequest);
      return;
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
