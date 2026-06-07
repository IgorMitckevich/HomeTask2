import express, { Request, Response } from "express";
import { HttpStatus } from "../https-statuses/httpStatuses";
import {
  BlogModel, CommentModel, DeviceModel, ExpiredCollectionModel,
  PostModel, RateLimitModel, UserModel

} from "../../db/mongo.db";

export const testsRouter = express.Router();

testsRouter.delete("/", async (req: Request, res: Response) => {
  await BlogModel.deleteMany({});
  await PostModel.deleteMany({});
  await UserModel.deleteMany({});
  await RateLimitModel.deleteMany({});
  await ExpiredCollectionModel.deleteMany({});
  await DeviceModel.deleteMany({});
  await CommentModel.deleteMany({});

  res.sendStatus(HttpStatus.NoContent);
});
