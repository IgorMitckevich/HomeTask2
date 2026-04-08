import { Response, Request } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { blogs } from "../../../db/dbBlogs";
import {blogsRepostirories} from "../../repositories/blogs.repostirories";
import {blogsCollection} from "../../../db/mongo.db";
import {BlogInputModel, BlogViewModel} from "../../types/blogersModel";
import {WithId} from "mongodb";
import {blogsService} from "../../application/blogsService";

export async function updateBlogById(req: Request<{id:string},{},BlogInputModel>, res: Response):Promise<void> {
  try{
    const id = req.params.id as string;

    const FoundedBlog: WithId<BlogViewModel>|null = await blogsService.findById(id);
    if (!FoundedBlog) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
   await blogsService.update(id,req.body)

    res.sendStatus(HttpStatus.NoContent);
  }
  catch(error){
    res.sendStatus(HttpStatus.InternalServerError)
  }

}
