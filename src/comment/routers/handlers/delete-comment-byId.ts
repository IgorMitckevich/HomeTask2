import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {QueryCommentsRepositories} from "../../repositories/query-comment-repostitories";
import {commentsService} from "../../application/comments-service";


export async function deleteCommentById(req: Request<{commentId:string}>, res: Response) {
    try{
        const commentId=req.params.commentId;
        const userId=req.user!.id;
        const findComment=await QueryCommentsRepositories.getCommentById(commentId);
        if(!findComment){
            res.sendStatus(HttpStatus.NotFound)
            return;
        }
        if(findComment.commentatorInfo.userId!==userId){
            res.sendStatus(HttpStatus.Forbidden)
            return
        }
        const deletedResult = await commentsService.deleteComment(commentId);
        if(!deletedResult){
            res.sendStatus(HttpStatus.BadRequest)
            return;
        }

        res.sendStatus(HttpStatus.NoContent)


    }catch(err){
        res.sendStatus(HttpStatus.InternalServerError)
    }

}