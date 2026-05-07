import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { postsRepostirories } from "../../repositories/posts.repostirories";
import { PostViewModel } from "../../types/postsModel";
import { WithId } from "mongodb";
import { postsService } from "../../application/posts.service";
import { queryPostsRepositories } from "../../repositories/query-posts-repositories";

export async function findPostsById(req: Request, res: Response) {
  const id = req.params.id as string;
  if (!id) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }
  const FoundedPost: WithId<PostViewModel> | null =
    await queryPostsRepositories.getPostById(id);
  if (!FoundedPost) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  res.status(HttpStatus.Ok).send(FoundedPost);
}
