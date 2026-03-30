import { Request, Response } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import {BlogViewModel} from "../../../types/blogersModel";
import {blogsRepostirories} from "../../../../blogs/repositories/blogs.repostirories";
import {WithId} from "mongodb";

export async function getBlogById(req: Request, res: Response):Promise<BlogViewModel|void> {
  const blogsId:string = req.params.id as string;
  if (!blogsId) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }
  const blogFind:WithId<BlogViewModel>|null= await blogsRepostirories.findById(blogsId);
  // const blogWithSeacrhedId: BlogViewModel | undefined = blogs.find(
  //   (blog) => blog.id === blogsId,
  // );
  if (!blogFind) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  res.status(HttpStatus.Ok).send(blogFind);
}
