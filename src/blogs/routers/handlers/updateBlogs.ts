import { Response, Request } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { BlogInputModel, BlogViewModel } from "../../types/blogersModel";
import { WithId } from "mongodb";
import { blogsService } from "../../../composition-root";
import { queryBlogsRepositories } from "../../../composition-root";

export async function updateBlogById(
  req: Request<{ id: string }, {}, BlogInputModel>,
  res: Response,
): Promise<void> {
  try {
    const id = req.params.id as string;

    const FoundedBlog: WithId<BlogViewModel> | null =
      await queryBlogsRepositories.getBlogById(id);
    if (!FoundedBlog) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    await blogsService.update(id, req.body);

    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
