import { Response, Request } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { WithId } from "mongodb";
import { PostViewModel } from "../../types/postsModel";
import { postsService } from "../../../composition-root";
import { queryPostsRepositories } from "../../../composition-root";

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
