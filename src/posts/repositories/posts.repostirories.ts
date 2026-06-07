import { PostInputModel, PostViewModel } from "../types/postsModel";
import { PostModel } from "../../db/mongo.db";
import { WithId } from "mongodb";
import {injectable} from "inversify";

@injectable()
export class PostsRepostirories {
  async create(newPosts: PostViewModel): Promise<WithId<PostViewModel>> {
    const createPost = await PostModel.insertMany(newPosts);
    return { ...newPosts, _id: createPost[0]._id };
  }
  async update(id: string, postsInputBody: PostInputModel): Promise<void> {
    const updatePost = await PostModel.updateOne(
      { id: id },
      {
        $set: {
          title: postsInputBody.title,
          shortDescription: postsInputBody.shortDescription,
          content: postsInputBody.content,
          blogId: postsInputBody.blogId,
        },
      },
    );

    if (updatePost.matchedCount < 1) {
      throw new Error("blogs not found");
    }

    return;
  }
  async delete(id: string): Promise<void> {
    const deletePost = await PostModel.deleteOne({ id: id });
    if (deletePost.deletedCount < 1) {
      throw new Error("blogs not found");
    }
    return;
  }
}
