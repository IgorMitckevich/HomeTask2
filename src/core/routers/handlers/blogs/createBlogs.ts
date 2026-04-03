import { Response, Request } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import {BlogInputModel, BlogViewModel} from "../../../types/blogersModel";
import { blogs } from "../../../../db/dbBlogs";
import {blogsRepostirories} from "../../../../blogs/repositories/blogs.repostirories";
import {blogsMap} from "../../mappers/blogsMap";
import {ObjectId} from "mongodb";



export async function createBlog(req: Request<{},{},BlogInputModel>, res: Response):Promise<void>  {

    try{

    const newBlog: BlogViewModel = {
    id:new ObjectId().toString(),
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
        createdAt: new Date().toISOString(),
     isMembership: false
  };

  const createBlog=await blogsRepostirories.create(newBlog);
 const BlogsViewModel=blogsMap(createBlog)
  res.status(HttpStatus.Created).send(BlogsViewModel);
} catch (error) {
        res.sendStatus(HttpStatus.InternalServerError);
    }
}
