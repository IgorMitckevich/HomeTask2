import {Request, Response} from 'express';
import {HttpStatus} from "../../../https-statuses/httpStatuses";
import {posts} from "../../../../db/dbPosts";

export function findAllPosts(req: Request, res: Response) {
    res.status(HttpStatus.Ok).send(posts);
}

