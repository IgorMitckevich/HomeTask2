import { Response, Request } from "express";
import { posts } from "../../../../db/dbPosts";
import { HttpStatus } from "../../../https-statuses/httpStatuses";
import {postsRepostirories} from "../../../../posts/repositories/posts.repostirories";
import {WithId} from "mongodb";
import {PostViewModel} from "../../../types/postsModel";

export async function deletePostsById(req: Request, res: Response) {

  try{
    const postsId = req.params.id as string;

    const FoundedPost:WithId<PostViewModel>|null = await postsRepostirories.findById(postsId);
    if (!FoundedPost ) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    await postsRepostirories.delete(postsId)
    res.sendStatus(HttpStatus.NoContent);
  }
 catch(err){
    res.sendStatus(HttpStatus.InternalServerError)
 }



}
