import express, { Request, Response } from "express";
import { HttpStatus } from "../https-statuses/httpStatuses";
import {blogs} from "../../db/dbBlogs";
import {posts} from "../../db/dbPosts";

export const testsRouter = express.Router();

testsRouter.delete("/", (req: Request, res: Response) => {
    blogs.length = 0;
    posts.length = 0;
    res.sendStatus(HttpStatus.NoContent)
});
