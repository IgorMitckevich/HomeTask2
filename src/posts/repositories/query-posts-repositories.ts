import { PaginatedOutput } from "../../core/types/Paginated-output";
import { WithId } from "mongodb";
import { PostViewModel } from "../types/postsModel";
import { postsCollection } from "../../db/mongo.db";

export const queryPostsRepositories = {
  async getAllPosts(
    queryDto: PaginatedOutput,
  ): Promise<{ items: WithId<PostViewModel>[]; totalCount: number }> {
    const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } =
      queryDto;
    const filter: any = {};
    const skip = (pageNumber - 1) * pageSize;
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }
    const [items, totalCount] = await Promise.all([
      postsCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      postsCollection.countDocuments(filter),
    ]);

    return { items, totalCount };
  },
  async getPostById(id: string): Promise<WithId<PostViewModel> | null> {
    return postsCollection.findOne({ id: id }, { projection: { _id: 0 } });
  },
  async getPostsByBlogId(
    queryDto: PaginatedOutput,
    blogId: string,
  ): Promise<{ items: WithId<PostViewModel>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const filter = { blogId: blogId };
    const skip = (pageNumber - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      postsCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      postsCollection.countDocuments(filter),
    ]);
    return { items, totalCount };
  },
};
