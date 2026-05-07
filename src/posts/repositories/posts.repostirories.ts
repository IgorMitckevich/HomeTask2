import { PostInputModel, PostViewModel } from "../types/postsModel";
import { postsCollection } from "../../db/mongo.db";
import { ObjectId, WithId } from "mongodb";
import { PaginatedOutput } from "../../core/types/Paginated-output";
import { PaginationType } from "../../core/types/pagination-type";

export const postsRepostirories = {
  async create(newPosts: PostViewModel): Promise<WithId<PostViewModel>> {
    const createPost = await postsCollection.insertOne(newPosts);
    return { ...newPosts, _id: createPost.insertedId };
  },
  async update(id: string, postsInputBody: PostInputModel): Promise<void> {
    const updatePost = await postsCollection.updateOne(
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
  },
  async delete(id: string): Promise<void> {
    const deletePost = await postsCollection.deleteOne({ id: id });
    if (deletePost.deletedCount < 1) {
      throw new Error("blogs not found");
    }
    return;
  },
};
