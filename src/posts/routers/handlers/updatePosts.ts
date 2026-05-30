import { Response, Request } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { WithId } from "mongodb";
import { PostInputModel, PostViewModel } from "../../types/postsModel";
import { postsService } from "../../../common/composition-root";
import { queryPostsRepositories } from "../../../common/composition-root";

export async function updatePostsById(
  req: Request<{ id: string }, {}, PostInputModel>,
  res: Response,
) {
  try {
    const id = req.params.id as string;

    const FoundedPost: WithId<PostViewModel> | null =
      await queryPostsRepositories.getPostById(id);
    if (!FoundedPost) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    await postsService.update(id, req.body);

    res.sendStatus(HttpStatus.NoContent);
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
