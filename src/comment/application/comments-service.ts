import { CommentViewModel } from "../types/CommentViewModel";
import { WithId } from "mongodb";
import { CommentInputModel } from "../types/CommentInputModel";
import { AuthMe } from "../../login/type/MeViewModel";
import {CommentsRepositories} from "../repositories/comments-repositoriest";
import {inject, injectable} from "inversify";

@injectable()
export class CommentsService {
  constructor(@inject(CommentsRepositories) protected commentsRepositories:CommentsRepositories){

  }
  async createComment(
    bodyDto: CommentInputModel,
    userData: AuthMe,
    postId: string,
  ): Promise<WithId<CommentViewModel> | null> {
    return this.commentsRepositories.create(bodyDto, userData, postId);
  }
  async updateComment(
    bodyDto: CommentInputModel,
    commentId: string,
  ): Promise<boolean> {
    return await this.commentsRepositories.update(bodyDto, commentId);
  }
  async deleteComment(commentId: string): Promise<boolean> {
    return this.commentsRepositories.delete(commentId);
  }
}
