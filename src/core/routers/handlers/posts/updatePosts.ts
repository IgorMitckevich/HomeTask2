import { Response, Request } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import { posts } from "../../../../db/dbPosts";

export function updatePostsById(req: Request, res: Response) {
  const id = req.params.id;

  const postsIndex: string = String(posts.findIndex((p) => p.id === id));
  if (postsIndex === "-1") {
    res.sendStatus(HttpStatus.NotFound);
  }

  const idNumber = Number(postsIndex);
  posts[idNumber].title = req.body.title;
  posts[idNumber].shortDescription = req.body.shortDescription;
  posts[idNumber].content = req.body.content;
  posts[idNumber].blogId = req.body.blogId;
  res.sendStatus(HttpStatus.NoContent);
}
