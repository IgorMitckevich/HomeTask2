import express, { Request, Response } from "express";
import { HttpStatus } from "../https-statuses/httpStatuses";
import {blogs} from "../../db/dbBlogs";
import {posts} from "../../db/dbPosts";
import {blogsCollection, postsCollection} from "../../db/mongo.db";

export const testsRouter = express.Router();

testsRouter.delete("/", async (req: Request, res: Response) => {
    await blogsCollection.deleteMany({})
    await postsCollection.deleteMany({})

    res.sendStatus(HttpStatus.NoContent)
});
