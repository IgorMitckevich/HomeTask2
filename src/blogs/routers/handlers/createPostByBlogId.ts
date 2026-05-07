import { Response, Request } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { PostInputModel, PostViewModel } from "../../../posts/types/postsModel";
import { postsMap } from "../../../posts/routers/mappers/postsMap";
import { ObjectId } from "mongodb";
import { postsService } from "../../../posts/application/posts.service";
import { blogsService } from "../../application/blogsService";
import { createPosts } from "../../../posts/routers/handlers/createPosts";
import { queryBlogsRepositories } from "../../repositories/query-blogs-repositories";

export async function createPostsByBlogId(
  req: Request<{ blogId: string }, {}, PostInputModel>,
  res: Response,
): Promise<void> {
  try {
    const blogId = req.params.blogId;

    const FoundedBlog = await queryBlogsRepositories.getBlogById(blogId);
    if (!FoundedBlog) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    const newPost: PostViewModel = {
      id: new ObjectId().toString(),
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId: FoundedBlog.id,
      blogName: FoundedBlog.name,
      createdAt: new Date().toISOString(),
    };

    const NEWPost = await postsService.create(newPost);
    const PostViewModel = postsMap(NEWPost);

    res.status(HttpStatus.Created).send(PostViewModel);
    return;
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
