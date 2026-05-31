import { Request, Response } from "express";
import { PaginatedOutput } from "../../../core/types/Paginated-output";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { mapPostsPaginated } from "../../../posts/routers/mappers/map-posts-list-paginated-output";
import { PostsPaginated } from "../../../posts/types/postPaginated";
import { PostsQueryInput } from "../../../posts/types/posts-query-input";
import { matchedData } from "express-validator";
import { queryBlogsRepositories } from "../../../composition-root";
import { queryPostsRepositories } from "../../../composition-root";

export async function getAllPostsByBlogId(
  req: Request<{ blogId: string }, {}, {}, PostsQueryInput>,
  res: Response,
): Promise<any> {
  try {
    const blogsId = req.params.blogId;

    const findBlog = await queryBlogsRepositories.getBlogById(blogsId);
    if (!findBlog) {
      return res.sendStatus(HttpStatus.NotFound);
    }
    const sanitizedQuery = matchedData<PaginatedOutput>(req, {
      locations: ["query"],
      includeOptionals: true,
    });
    const queryInput = { ...sanitizedQuery };

    const posts = await queryPostsRepositories.getPostsByBlogId(
      queryInput,
      blogsId,
    );

    const postsOutput: PostsPaginated = mapPostsPaginated(
      posts,
      queryInput.pageNumber,
      queryInput.pageSize,
    );

    res.status(HttpStatus.Ok).send(postsOutput);
  } catch (e) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
