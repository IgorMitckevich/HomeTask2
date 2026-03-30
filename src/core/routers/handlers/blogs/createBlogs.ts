import { Response, Request } from "express";
import { FieldError } from "../../../types/ErrorsModel";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import {BlogViewModel} from "../../../types/blogersModel";
import { blogs } from "../../../../db/dbBlogs";
import {blogsRepostirories} from "../../../../blogs/repositories/blogs.repostirories";
import {posts} from "../../../../db/dbPosts";
import {blogsMap} from "../../mappers/blogsMap";


export async function createBlog(req: Request, res: Response):Promise<void>  {

    try{

    const newBlog: BlogViewModel = {
    id:blogs.length ? blogs[blogs.length - 1].id + "1" : "1",
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
     created_at: new Date().toISOString(),
     isMembership: false
  };

  const createBlog=await blogsRepostirories.create(newBlog);
 const BlogsViewModel=blogsMap(createBlog)
  res.status(HttpStatus.Created).send(BlogsViewModel);
} catch (error) {
        res.sendStatus(HttpStatus.InternalServerError);
    }
}
