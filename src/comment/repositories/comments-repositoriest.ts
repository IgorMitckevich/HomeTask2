import {CommentModel} from "../../db/mongo.db";
import { CommentViewModel } from "../types/CommentViewModel";
import { ObjectId, WithId } from "mongodb";
import { CommentInputModel } from "../types/CommentInputModel";
import { AuthMe } from "../../login/type/MeViewModel";
import {injectable} from "inversify";
import {CommentsDB} from "../types/typeCommentsDB";

@injectable()
export class CommentsRepositories {
  async create(
    bodyDto: CommentInputModel,
    userData: AuthMe,
    postId: string,
  ): Promise<WithId<CommentViewModel> | null> {
    const createComment = await CommentModel.insertMany({
      id: new ObjectId().toString(),
      content: bodyDto.content,
      createdAt: new Date().toISOString(),
      commentatorInfo: {
        userId: userData.userId,
        userLogin: userData.login,
      },
      postId: postId,
    });

    const commentId = createComment[0]._id;
    const comment= await CommentModel.findOne(
      { _id: commentId },
      { projection: { postId: 0 } },
    ).lean() as WithId<CommentViewModel>;

    return comment;
  }
  async delete(commentId: string): Promise<boolean> {
    const deletedComment = await CommentModel.deleteOne({
      id: commentId,
    });
    if (deletedComment.deletedCount < 1) {
      return false;
    }
    return true;
  }
  async update(
    bodyDto: CommentInputModel,
    commentId: string,
  ): Promise<boolean> {
    const updatedComment = await CommentModel.updateOne(
      { id: commentId },
      { $set: { content: bodyDto.content } },
    );

    if (updatedComment.matchedCount < 1) {
      return false;
    }

    return true;
  }
}
