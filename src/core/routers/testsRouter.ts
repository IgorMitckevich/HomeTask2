import express, { Request, Response } from "express";
import { HttpStatus } from "../https-statuses/httpStatuses";
import {
  blogsCollection,
  postsCollection,
  usersCollection,
} from "../../db/mongo.db";

export const testsRouter = express.Router();

testsRouter.delete("/", async (req: Request, res: Response) => {
  await blogsCollection.deleteMany({});
  await postsCollection.deleteMany({});
  await usersCollection.deleteMany({});

  res.sendStatus(HttpStatus.NoContent);
});
