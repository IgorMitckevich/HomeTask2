import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {QueryCommentsRepositories} from "../../repositories/query-comment-repostitories";


export async function getCommentsById(req: Request<{id:string}>, res: Response) {
    try{
        const id=req.params.id;
        const comments=await QueryCommentsRepositories.getCommentById(id)
        if(!comments){
            res.sendStatus(HttpStatus.NotFound)
            return;
        }


        res.status(HttpStatus.Ok).send({
            id:comments.id,
            content:comments.content,
            createdAt:comments.createdAt,
            commentatorInfo:comments.commentatorInfo,
        });


    }catch(e){
        res.sendStatus(HttpStatus.InternalServerError)
    }


}


