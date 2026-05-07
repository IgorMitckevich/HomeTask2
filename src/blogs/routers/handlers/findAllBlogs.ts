import {Request, Response} from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { PaginatedOutput } from "../../../core/types/Paginated-output";
import { matchedData } from "express-validator";
import { mapBlogsPaginated } from "../mappers/map-blogs-list-paginated-output";
import { queryBlogsRepositories } from "../../repositories/query-blogs-repositories";

export async function findAllBlogs(
  req: Request<{}, {}, {}, PaginatedOutput>,
  res: Response,
): Promise<void> {
  const sanitizedQuery = matchedData<PaginatedOutput>(req, {
    locations: ["query"],
    includeOptionals: true,
  });
  const queryInput = { ...sanitizedQuery };
  const blogs = await queryBlogsRepositories.getAllBlogs(queryInput);
  const BlogsViewModel = mapBlogsPaginated(
    blogs,
    queryInput.pageNumber,
    queryInput.pageSize,
  );
  res.status(HttpStatus.Ok).send(BlogsViewModel);
}
