import { BlogInputModel, BlogViewModel } from "../types/blogersModel";
import {BlogModel} from "../../db/mongo.db";
import { WithId } from "mongodb";
import {injectable} from "inversify";

@injectable()
export class BlogsRepositories {
  async create(newBlog: BlogViewModel): Promise<WithId<BlogViewModel>> {
    const insertBlogs = await BlogModel.insertMany(newBlog);

    return { ...newBlog, _id: insertBlogs[0]._id };
  }
  async update(id: string, blogsInputBody: BlogInputModel): Promise<void> {
    const updateResult = await BlogModel.updateOne(
      { id: id },
      {
        $set: {
          name: blogsInputBody.name,
          description: blogsInputBody.description,
          websiteUrl: blogsInputBody.websiteUrl,
        },
      },
    );
    if (updateResult.matchedCount < 1) {
      throw new Error("blogs not found");
    }
    return;
  }
  async delete(id: string): Promise<void> {
    const deleteResult = await BlogModel.deleteOne({ id: id });
    if (deleteResult.deletedCount < 1) {
      throw new Error("blogs not found");
    }
    return;
  }
}
