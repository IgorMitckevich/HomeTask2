import { Response, Request } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import { posts } from "../../../../db/dbPosts";
import { PostViewModel } from "../../../types/postsModel";
import {blogs} from "../../../../db/dbBlogs";

export function createPosts(req: Request, res: Response) {
  const blogId = req.body.blogId;
  if (!blogId) {
    res.sendStatus(404);
  }
  const blogIndex=blogs.findIndex(b=>b.id===blogId);
  const newPost: PostViewModel = {
    id: posts.length ? posts[posts.length - 1].id + "1" : "1",
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
    blogName: blogs[blogIndex].name
  };

  posts.push(newPost);

  res.status(HttpStatus.Created).send(posts[posts.length - 1]);
}
