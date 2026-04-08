import { Response, Request } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import {BlogInputModel, BlogViewModel} from "../../types/blogersModel";
import {blogsMap} from "../mappers/blogsMap";
import {ObjectId} from "mongodb";
import {blogsService} from "../../application/blogsService";



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

  const createBlog=await blogsService.create(newBlog);
 const BlogsViewModel=blogsMap(createBlog)
  res.status(HttpStatus.Created).send(BlogsViewModel);
} catch (error) {
        res.sendStatus(HttpStatus.InternalServerError);
    }
}
