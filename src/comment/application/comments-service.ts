import { commentsRepositories } from "../../common/composition-root";
import { CommentViewModel } from "../types/CommentViewModel";
import { WithId } from "mongodb";
import { CommentInputModel } from "../types/CommentInputModel";
import { AuthMe } from "../../login/type/MeViewModel";

export class CommentsService {
  async createComment(
    bodyDto: CommentInputModel,
    userData: AuthMe,
    postId: string,
  ): Promise<WithId<CommentViewModel> | null> {
    return commentsRepositories.create(bodyDto, userData, postId);
  }
  async updateComment(
    bodyDto: CommentInputModel,
    commentId: string,
  ): Promise<boolean> {
    return await commentsRepositories.update(bodyDto, commentId);
  }
  async deleteComment(commentId: string): Promise<boolean> {
    return commentsRepositories.delete(commentId);
  }
}
