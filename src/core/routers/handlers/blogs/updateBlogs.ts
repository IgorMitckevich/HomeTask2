import { Response, Request } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import { blogs } from "../../../../db/dbBlogs";

export function updateBlogById(req: Request, res: Response) {
  const id = req.params.id;

  const blogIndex: string = String(blogs.findIndex((b) => b.id === id));
  if (blogIndex === "-1") {
    res.sendStatus(HttpStatus.NotFound);
  }

  const idNumber = Number(blogIndex);
  blogs[idNumber].name = req.body.name;
  blogs[idNumber].description = req.body.description;
  blogs[idNumber].websiteUrl = req.body.websiteUrl;
  res.sendStatus(HttpStatus.NoContent);
}
