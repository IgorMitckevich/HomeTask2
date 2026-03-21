import {Request, Response} from 'express';
import {HttpStatus} from "../../../https-statuses/httpStatuses";
import {blogs} from "../../../../db/dbBlogs";

export function findAllBlogs(req: Request, res: Response) {
    res.status(HttpStatus.Ok).send(blogs);
}

