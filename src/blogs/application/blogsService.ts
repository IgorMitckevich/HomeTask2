import { BlogInputModel, BlogViewModel } from "../types/blogersModel";
import { WithId } from "mongodb";
import { blogsRepositories } from "../../common/composition-root";

export class BlogsService {
  async create(newBlog: BlogViewModel): Promise<WithId<BlogViewModel>> {
    const BlogToInsert = {
      id: newBlog.id,
      name: newBlog.name,
      description: newBlog.description,
      websiteUrl: newBlog.websiteUrl,
      createdAt: newBlog.createdAt,
      isMembership: newBlog.isMembership,
    };
    return blogsRepositories.create(BlogToInsert);
  }
  async update(id: string, blogsInputBody: BlogInputModel): Promise<void> {
    await blogsRepositories.update(id, blogsInputBody);

    return;
  }
  async delete(id: string): Promise<void> {
    await blogsRepositories.delete(id);

    return;
  }
}
