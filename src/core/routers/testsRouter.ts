import express, { Request, Response } from "express";
import { HttpStatus } from "../https-statuses/httpStatuses";
import {
  blogsCollection, commentsCollection, devicesCollection, expiredTokensCollection,
  postsCollection, rateLimitCollection,
  usersCollection,
} from "../../db/mongo.db";

export const testsRouter = express.Router();

testsRouter.delete("/", async (req: Request, res: Response) => {
  await blogsCollection.deleteMany({});
  await postsCollection.deleteMany({});
  await usersCollection.deleteMany({});
  await rateLimitCollection.deleteMany({});
  await expiredTokensCollection.deleteMany({});
  await devicesCollection.deleteMany({});
  await commentsCollection.deleteMany({});

  res.sendStatus(HttpStatus.NoContent);
});
