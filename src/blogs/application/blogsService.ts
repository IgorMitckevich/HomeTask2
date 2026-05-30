import { BlogInputModel, BlogViewModel } from "../types/blogersModel";
import { WithId } from "mongodb";
import { blogsRepostirories } from "../../common/composition-root";

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
    return blogsRepostirories.create(BlogToInsert);
  }
  async update(id: string, blogsInputBody: BlogInputModel): Promise<void> {
    await blogsRepostirories.update(id, blogsInputBody);

    return;
  }
  async delete(id: string): Promise<void> {
    await blogsRepostirories.delete(id);

    return;
  }
}
