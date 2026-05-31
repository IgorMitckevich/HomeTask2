import {injectable,inject} from "inversify";
import { BlogInputModel, BlogViewModel } from "../types/blogersModel";
import { WithId } from "mongodb";
import {BlogsRepositories} from "../repositories/blogsRepositories";


@injectable()
export class BlogsService {
  constructor(@inject(BlogsRepositories) protected blogsRepositories: BlogsRepositories) {

  }
  async create(newBlog: BlogViewModel): Promise<WithId<BlogViewModel>> {
    const BlogToInsert = {
      id: newBlog.id,
      name: newBlog.name,
      description: newBlog.description,
      websiteUrl: newBlog.websiteUrl,
      createdAt: newBlog.createdAt,
      isMembership: newBlog.isMembership,
    };
    return this.blogsRepositories.create(BlogToInsert);
  }
  async update(id: string, blogsInputBody: BlogInputModel): Promise<void> {
    await this.blogsRepositories.update(id, blogsInputBody);

    return;
  }
  async delete(id: string): Promise<void> {
    await this.blogsRepositories.delete(id);

    return;
  }
}
