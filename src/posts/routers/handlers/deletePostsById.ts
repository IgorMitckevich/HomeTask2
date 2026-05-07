import { Response, Request } from "express";
import { posts } from "../../../db/dbPosts";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { postsRepostirories } from "../../repositories/posts.repostirories";
import { WithId } from "mongodb";
import { PostViewModel } from "../../types/postsModel";
import { postsService } from "../../application/posts.service";
import { queryPostsRepositories } from "../../repositories/query-posts-repositories";

export async function deletePostsById(req: Request, res: Response) {
  try {
    const postId = req.params.id as string;

    const FoundedPost: WithId<PostViewModel> | null =
      await queryPostsRepositories.getPostById(postId);
    if (!FoundedPost) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    await postsService.delete(postId);
    res.sendStatus(HttpStatus.NoContent);
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
