import { Response, Request } from "express";
import { BlogViewModel } from "../../../types/blogersModel";
import { blogs } from "../../../../db/dbBlogs";
import { HttpStatus } from "../../../https-statuses/httpStatuses";

export function deleteBlogsById(req: Request, res: Response) {
  const id = req.params.id;

  const blogIndex: string = String(blogs.findIndex((b) => b.id === id));
  if (blogIndex === "-1") {
    res.sendStatus(HttpStatus.NotFound);
  }

  blogs.splice(+blogIndex, 1);
  res.sendStatus(HttpStatus.NoContent);
}
