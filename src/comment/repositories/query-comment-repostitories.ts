import { CommentModel } from "../../db/mongo.db";
import { CommentViewModel } from "../types/CommentViewModel";
import { WithId } from "mongodb";
import {injectable} from "inversify";

@injectable()
export class QueryCommentsRepositories {
  async get(
    queryDto: any,
    postId: string,
  ): Promise<{ items: WithId<CommentViewModel>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const filter: any = { postId: postId };
    const skip = (pageNumber - 1) * pageSize;
    const [items, totalCount] = await Promise.all([
      CommentModel
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      CommentModel.countDocuments(filter),
    ]);

    return { items, totalCount };
  }
  async getCommentById(id: string): Promise<WithId<CommentViewModel> | null> {
    const comments = await CommentModel.findOne(
      { id: id },
      { projection: { postId: 0 } },
    ).lean();
    if (!comments) {
      return null;
    }
    return comments;
  }
}
