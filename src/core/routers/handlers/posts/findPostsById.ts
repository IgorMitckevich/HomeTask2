import {Request, Response} from "express";
import {HttpStatus} from "../../../https-statuses/httpStatuses";
import {posts} from "../../../../db/dbPosts";
import {PostViewModel} from "../../../types/postsModel";


export function findPostsById(req: Request, res: Response) {
    const postsId=req.params.id;
    if(!postsId){
        res.sendStatus(HttpStatus.NotFound)
        return;
    }
    const postsWithSeacrhedId:PostViewModel|undefined=posts.find(posts=>posts.id===postsId);
    if(!postsWithSeacrhedId){
        res.sendStatus(HttpStatus.NotFound)
        return;
    }

    res.status(HttpStatus.Ok).send(postsWithSeacrhedId);
}