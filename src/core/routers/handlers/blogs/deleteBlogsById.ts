import { Response, Request } from "express";
import { blogs } from "../../../../db/dbBlogs";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import {blogsRepostirories} from "../../../../blogs/repositories/blogs.repostirories";
import {BlogViewModel} from "../../../types/blogersModel";
import {WithId} from "mongodb";

export async function deleteBlogsById(req: Request, res: Response):Promise<void> {

 try{
     const id :string=req.params.id as string ;

     const FoundedBlog: WithId<BlogViewModel>|null =  await blogsRepostirories.findById(id);
     if (!FoundedBlog) {
         res.sendStatus(HttpStatus.NotFound);
         return;
     }

     await blogsRepostirories.delete(id)
     res.sendStatus(HttpStatus.NoContent);

 }catch(error){
     res.sendStatus(HttpStatus.InternalServerError)
 }


}
