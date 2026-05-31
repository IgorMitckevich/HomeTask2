import {Request, Response} from "express";
import {HttpStatus} from "../../core/https-statuses/httpStatuses";
import {CommentInputModel} from "../types/CommentInputModel";
import {inject, injectable} from "inversify";
import {CommentsService} from "../application/comments-service";
import {QueryCommentsRepositories} from "../repositories/query-comment-repostitories";

@injectable()
export class CommentsController{
    constructor(@inject(CommentsService) protected commentsService:CommentsService,
                @inject(QueryCommentsRepositories) protected queryCommentsRepositories:QueryCommentsRepositories,){

    }

    async  getCommentsById(
        req: Request<{ id: string }>,
        res: Response,
    ) {
        try {
            const id = req.params.id;
            const comments = await this.queryCommentsRepositories.getCommentById(id);
            if (!comments) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }

            res.status(HttpStatus.Ok).send({
                id: comments.id,
                content: comments.content,
                createdAt: comments.createdAt,
                commentatorInfo: comments.commentatorInfo,
            });
        } catch (e) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }

    async  deleteCommentById(
        req: Request<{ commentId: string }>,
        res: Response,
    ) {
        try {
            const commentId = req.params.commentId;
            const userId = req.user!.id;
            const findComment =
                await this.queryCommentsRepositories.getCommentById(commentId);
            if (!findComment) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }
            if (findComment.commentatorInfo.userId !== userId) {
                res.sendStatus(HttpStatus.Forbidden);
                return;
            }
            const deletedResult = await this.commentsService.deleteComment(commentId);
            if (!deletedResult) {
                res.sendStatus(HttpStatus.BadRequest);
                return;
            }

            res.sendStatus(HttpStatus.NoContent);
        } catch (err) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }
    async  updateCommentById(
        req: Request<{ commentId: string }, {}, CommentInputModel>,
        res: Response,
    ) {
        try {
            const commentId = req.params.commentId;
            const userId = req.user.id;
            const findComment =
                await this.queryCommentsRepositories.getCommentById(commentId);
            if (!findComment) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }
            if (findComment.commentatorInfo.userId !== userId) {
                res.sendStatus(HttpStatus.Forbidden);
                return;
            }
            const resultOfUpdateComment = await this.commentsService.updateComment(
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
}