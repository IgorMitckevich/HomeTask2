import { Request, Response } from "express";
import { CommentInputModel } from "../../../comment/types/CommentInputModel";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { commentsService } from "../../../composition-root";
import { queryUsersRepositories } from "../../../composition-root";
import { CommentViewModel } from "../../../comment/types/CommentViewModel";
import { queryPostsRepositories } from "../../../composition-root";


export async function createComments(
  req: Request<{ postId: string }, {}, CommentInputModel>,
  res: Response,
) {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;
    const checkPost = await queryPostsRepositories.getPostById(postId);
    const checkUser = await queryUsersRepositories.getUserByID(userId);

    if (!checkPost) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    if (!checkUser) {
      res.sendStatus(HttpStatus.Forbidden);
      return;
    }

    const contentBody = req.body;
    const createdComment = await commentsService.createComment(
      contentBody,
      checkUser,
      postId,
    );

    if (!createdComment) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    const CommentViewModel: CommentViewModel = {
      id: createdComment.id,
      content: createdComment.content,
      createdAt: createdComment.createdAt,
      commentatorInfo: createdComment.commentatorInfo,
    };

    res.status(HttpStatus.Created).send(CommentViewModel);
  } catch (err) {}
}
