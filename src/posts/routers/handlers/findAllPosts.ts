import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import {PaginatedOutput} from "../../../core/types/Paginated-output";
import {matchedData} from "express-validator";
import {DEFAULT_VALUEST} from "../../../core/middlewares/validation/query-pagination-sorting.vallidation-middleware";
import {postsService} from "../../application/posts.service";
import {mapPostsPaginated} from "../mappers/map-posts-list-paginated-output";
import {postsMap} from "../mappers/postsMap";
import {queryPostsRepositories} from "../../repositories/query-posts-repositories";

export async function findAllPosts(req: Request, res: Response) {
  try{

      const sanitizedQuery = matchedData<PaginatedOutput>(req,{
          locations: ['query'],
          includeOptionals: true,})
      const queryInput={...sanitizedQuery};
      const posts=await queryPostsRepositories.getAllPosts(queryInput);
    if (!posts){
         res.sendStatus(HttpStatus.NotFound)
        return
    }

      const findedPosts=mapPostsPaginated(posts, queryInput.pageNumber, queryInput.pageSize)

    res.status(HttpStatus.Ok).send(findedPosts);
  }catch(err){
    res.sendStatus(HttpStatus.InternalServerError);
  }

}
