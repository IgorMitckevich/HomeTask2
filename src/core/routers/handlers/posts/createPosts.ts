import { Response, Request } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import { posts } from "../../../../db/dbPosts";
import { PostViewModel } from "../../../types/postsModel";

export function createPosts(req: Request, res: Response) {
  const blogId = req.body.blogId;
  if (!blogId) {
    res.sendStatus(404);
  }
  const newPost: PostViewModel = {
    id: posts.length ? posts[posts.length - 1].id + "1" : "1",
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
    blogName: req.body.blogName,
  };

  posts.push(newPost);

  res.status(HttpStatus.Created).send(posts[posts.length - 1]);
}
