import {Response,Request} from 'express';
import {posts} from "../../../../db/dbPosts";
import {HttpStatus} from "../../../https-statuses/httpStatuses";

export function deletePostsById(req: Request, res: Response) {
    const id = req.params.id;

    const postsIndex:string=String(posts.findIndex(b=>b.id === id));
    if(postsIndex==='-1'){
        res.sendStatus(HttpStatus.NotFound);
    }

    posts.splice(+postsIndex,1)
    res.sendStatus(HttpStatus.NoContent)
}