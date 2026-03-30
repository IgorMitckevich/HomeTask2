import { Request, Response } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import { posts } from "../../../../db/dbPosts";
import {postsRepostirories} from "../../../../posts/repositories/posts.repostirories";
import {blogsRepostirories} from "../../../../blogs/repositories/blogs.repostirories";
import {blogs} from "../../../../db/dbBlogs";
import {postsMap} from "../../mappers/postsMap";

export async function findAllPosts(req: Request, res: Response) {
  const posts=await postsRepostirories.findAll();
  const postsViewModel=posts.map(postsMap);

  res.status(HttpStatus.Ok).send(postsViewModel);
}
