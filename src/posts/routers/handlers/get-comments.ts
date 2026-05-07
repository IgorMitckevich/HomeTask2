import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { postsService } from "../../application/posts.service";
import { QueryCommentsRepositories } from "../../../comment/repositories/query-comment-repostitories";
import { matchedData } from "express-validator";
import { PaginatedOutput } from "../../../core/types/Paginated-output";
import { mapCommentsPagination } from "../mappers/map-comments";
import { queryPostsRepositories } from "../../repositories/query-posts-repositories";

export const getCommentsByPostId = async (
  req: Request<{ postId: string }, {}, {}, PaginatedOutput>,
  res: Response,
) => {
  try {
    const postId = req.params.postId;

    const checkPost = await queryPostsRepositories.getPostById(postId);
    if (!checkPost) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    const sanitizedQuery = matchedData<PaginatedOutput>(req, {
      locations: ["query"],
      includeOptionals: true,
    });
    const queryInput = {
      pageNumber: sanitizedQuery.pageNumber,
      pageSize: sanitizedQuery.pageSize,
      sortBy: sanitizedQuery.sortBy,
      sortDirection: sanitizedQuery.sortDirection,
    };

    const getComments = await QueryCommentsRepositories.get(queryInput, postId);
    const pagginationComments = mapCommentsPagination(
      getComments,
      queryInput.pageNumber,
      queryInput.pageSize,
    );

    res.status(HttpStatus.Ok).send(pagginationComments);
  } catch (e) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
