import { Response, Request } from "express";
import { HttpStatus } from "../../../https-statuses/httpStatuses";

import {postsRepostirories} from "../../../../posts/repositories/posts.repostirories";
import {WithId} from "mongodb";
import {PostInputModel, PostViewModel} from "../../../types/postsModel";

export async function updatePostsById(req: Request<{id:string},{},PostInputModel>, res: Response) {

  try{
    const id = req.params.id as string;

    const FoundedPost:WithId<PostViewModel>|null = await postsRepostirories.findById(id);
    if (!FoundedPost ) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    await postsRepostirories.update(id, req.body)

    res.sendStatus(HttpStatus.NoContent);
  }
  catch(err){
    res.sendStatus(HttpStatus.InternalServerError);
  }

}
