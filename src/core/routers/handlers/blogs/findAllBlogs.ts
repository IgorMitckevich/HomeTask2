import { Request, Response } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import {blogsRepostirories} from "../../../../blogs/repositories/blogs.repostirories";
import {blogsMap} from "../../mappers/blogsMap";

export async function findAllBlogs(req: Request, res: Response):Promise<void> {

  const blogs=await blogsRepostirories.findAll();
  const BlogsViewModel=blogs.map(blogsMap);
  res.status(HttpStatus.Ok).send(BlogsViewModel);
}
