import { Request, Response } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import {postsRepostirories} from "../../../../posts/repositories/posts.repostirories";
import {PostViewModel} from "../../../types/postsModel";
import {WithId} from "mongodb";

export async function findPostsById(req: Request, res: Response) {
  const postsId = req.params.id as string;
  if (!postsId) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }
  const FoundedPost:WithId<PostViewModel>|null = await postsRepostirories.findById(postsId);
  if (!FoundedPost ) {
    res.sendStatus(HttpStatus.NotFound);
  }

  res.status(HttpStatus.Ok).send(FoundedPost);
}
