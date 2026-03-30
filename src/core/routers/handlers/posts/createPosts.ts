import { Response, Request } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import { posts } from "../../../../db/dbPosts";
import { PostViewModel } from "../../../types/postsModel";
import {blogs} from "../../../../db/dbBlogs";
import {postsRepostirories} from "../../../../posts/repositories/posts.repostirories";
import {postsMap} from "../../mappers/postsMap";
import {blogsRepostirories} from "../../../../blogs/repositories/blogs.repostirories";


export async function createPosts(req: Request, res: Response):Promise<void> {
 try{
   const blogId = req.body.blogId;
   if (!blogId) {
     res.sendStatus(HttpStatus.NoContent);
     return;
   }

   const FoundedBlog=await blogsRepostirories.findById(blogId)
   if(!FoundedBlog){
     res.sendStatus(HttpStatus.BadRequest);
     return;
   }

   const newPost: PostViewModel = {
     id: posts.length ? posts[posts.length - 1].id + "1" : "1",
     title: req.body.title,
     shortDescription: req.body.shortDescription,
     content: req.body.content,
     blogId: req.body.blogId,
     blogName: FoundedBlog.name,
     createdAt:new Date().toISOString(),
   };

   const NEWPost = await postsRepostirories.create(newPost);
   const PostViewModel=postsMap(NEWPost);

   res.status(HttpStatus.Created).send(postsRepostirories.create(PostViewModel));
 }
 catch(err){
   res.sendStatus(HttpStatus.InternalServerError);
 }
}
