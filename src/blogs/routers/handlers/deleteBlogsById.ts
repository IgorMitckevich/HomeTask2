import { Response, Request } from "express";
import { blogs } from "../../../db/dbBlogs";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { blogsRepostirories } from "../../repositories/blogs.repostirories";
import { BlogViewModel } from "../../types/blogersModel";
import { WithId } from "mongodb";
import { blogsService } from "../../application/blogsService";
import { queryBlogsRepositories } from "../../repositories/query-blogs-repositories";

export async function deleteBlogsById(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const id: string = req.params.id as string;

    const FoundedBlog: WithId<BlogViewModel> | null =
      await queryBlogsRepositories.getBlogById(id);
    if (!FoundedBlog) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    await blogsService.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
