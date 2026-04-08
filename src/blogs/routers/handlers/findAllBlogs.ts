import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import {blogsRepostirories} from "../../repositories/blogs.repostirories";
import {blogsMap} from "../mappers/blogsMap";
import {PaginatedOutput} from "../../../core/types/Paginated-output";
import {matchedData} from "express-validator";
import {blogsService} from "../../application/blogsService";
import {DEFAULT_VALUEST} from "../../../core/middlewares/validation/query-pagination-sorting.vallidation-middleware";
import {mapPostsPaginated} from "../../../posts/routers/mappers/map-posts-list-paginated-output";
import {mapBlogsPaginated} from "../mappers/map-blogs-list-paginated-output";

export async function findAllBlogs(req: Request<{},{},{},PaginatedOutput>, res: Response):Promise<void> {

  const sanitizedQuery = matchedData<PaginatedOutput>(req,{
    locations: ['query'],
    includeOptionals: true,})
  const queryInput={...sanitizedQuery};
  const blogs=await blogsService.findAll(queryInput);
   const BlogsViewModel=mapBlogsPaginated(
       blogs, queryInput.pageNumber, queryInput.pageSize
       );
  res.status(HttpStatus.Ok).send(BlogsViewModel);
}
