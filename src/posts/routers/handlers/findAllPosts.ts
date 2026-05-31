import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { PaginatedOutput } from "../../../core/types/Paginated-output";
import { matchedData } from "express-validator";
import { mapPostsPaginated } from "../mappers/map-posts-list-paginated-output";
import { queryPostsRepositories } from "../../../composition-root";

export async function findAllPosts(req: Request, res: Response) {
  try {
    const sanitizedQuery = matchedData<PaginatedOutput>(req, {
      locations: ["query"],
      includeOptionals: true,
    });
    const queryInput = { ...sanitizedQuery };
    const posts = await queryPostsRepositories.getAllPosts(queryInput);
    if (!posts) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    const findedPosts = mapPostsPaginated(
      posts,
      queryInput.pageNumber,
      queryInput.pageSize,
    );

    res.status(HttpStatus.Ok).send(findedPosts);
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
