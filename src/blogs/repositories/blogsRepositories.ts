import { injectable } from "inversify";
import { BlogInputModel, BlogViewModel } from "../types/blogersModel";
import { blogsCollection } from "../../db/mongo.db";
import { WithId } from "mongodb";



@injectable()
export class BlogsRepositories {
  async create(newBlog: BlogViewModel): Promise<WithId<BlogViewModel>> {
    const insertBlogs = await blogsCollection.insertOne(newBlog);

    return { ...newBlog, _id: insertBlogs.insertedId };
  }
  async update(id: string, blogsInputBody: BlogInputModel): Promise<void> {
    const updateResult = await blogsCollection.updateOne(
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
    const deleteResult = await blogsCollection.deleteOne({ id: id });
    if (deleteResult.deletedCount < 1) {
      throw new Error("blogs not found");
    }
    return;
  }
}
