import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { BlogViewModel } from "../../types/blogersModel";
import { blogsRepostirories } from "../../repositories/blogs.repostirories";
import { WithId } from "mongodb";
import { blogsService } from "../../application/blogsService";
import { queryBlogsRepositories } from "../../repositories/query-blogs-repositories";

export async function getBlogById(
  req: Request,
  res: Response,
): Promise<BlogViewModel | void> {
  const blogsId: string = req.params.id as string;
  if (!blogsId) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }
  const blogFind: WithId<BlogViewModel> | null =
    await queryBlogsRepositories.getBlogById(blogsId);

  if (!blogFind) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  res.status(HttpStatus.Ok).send(blogFind);
}
