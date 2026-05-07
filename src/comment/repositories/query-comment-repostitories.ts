import { commentsCollection } from "../../db/mongo.db";
import { CommentViewModel } from "../types/CommentViewModel";
import { WithId } from "mongodb";
import { PaginatedOutput } from "../../core/types/Paginated-output";
import { CommentsDB } from "../types/typeCommentsDB";

export const QueryCommentsRepositories = {
  async get(
    queryDto: any,
    postId: string,
  ): Promise<{ items: WithId<CommentViewModel>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const filter: any = { postId: postId };
    const skip = (pageNumber - 1) * pageSize;
    const [items, totalCount] = await Promise.all([
      commentsCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      commentsCollection.countDocuments(filter),
    ]);

    return { items, totalCount };
  },
  async getCommentById(id: string): Promise<WithId<CommentViewModel> | null> {
    const comments = await commentsCollection.findOne(
      { id: id },
      { projection: { postId: 0 } },
    );
    if (!comments) {
      return null;
    }
    return comments;
  },
};
