import { BlogInputModel, BlogViewModel } from "../types/blogersModel";
import { WithId } from "mongodb";
import {inject, injectable} from "inversify";
import {BlogsRepositories} from "../repositories/blogsRepositories";

@injectable()
export class BlogsService {
  constructor(@inject(BlogsRepositories) protected blogsRepository: BlogsRepositories) {

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
    return this.blogsRepository.create(BlogToInsert);
  }
  async update(id: string, blogsInputBody: BlogInputModel): Promise<void> {
    await this.blogsRepository.update(id, blogsInputBody);

    return;
  }
  async delete(id: string): Promise<void> {
    await this.blogsRepository.delete(id);

    return;
  }
}
