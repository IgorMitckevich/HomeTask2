import { Response, Request } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { PostInputModel, PostViewModel } from "../../types/postsModel";
import { postsMap } from "../mappers/postsMap";
import { ObjectId } from "mongodb";
import { postsService } from "../../application/posts.service";
import { blogsService } from "../../../blogs/application/blogsService";
import { queryBlogsRepositories } from "../../../blogs/repositories/query-blogs-repositories";

export async function createPosts(
  req: Request<{}, {}, PostInputModel>,
  res: Response,
): Promise<void> {
  try {
    const blogId = req.body.blogId;

    const FoundedBlog = await queryBlogsRepositories.getBlogById(blogId);
    if (!FoundedBlog) {
      res.sendStatus(HttpStatus.BadRequest);
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
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
