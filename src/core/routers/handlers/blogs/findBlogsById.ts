import { Request, Response } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import { BlogViewModel } from "../../../types/blogersModel";
import { blogs } from "../../../../db/dbBlogs";

export function getBlogById(req: Request, res: Response) {
  const blogsId = req.params.id;
  if (!blogsId) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }
  const blogWithSeacrhedId: BlogViewModel | undefined = blogs.find(
    (blog) => blog.id === blogsId,
  );
  if (!blogWithSeacrhedId) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  res.status(HttpStatus.Ok).send(blogWithSeacrhedId);
}
