import {CommentsRepositories} from "../repositories/comments-repositoriest";
import {CommentViewModel} from "../types/CommentViewModel";
import {ObjectId, WithId} from "mongodb";
import {CommentInputModel} from "../types/CommentInputModel";
import {AuthMe} from "../../login/type/MeViewModel";
import {IdType} from "../../common/id-type";
import {CommentsDB} from "../types/typeCommentsDB";

export const commentsService={

    async createComment(bodyDto:CommentInputModel,userData:AuthMe,postId:string):Promise<WithId<CommentViewModel>|null> {



        return CommentsRepositories.create(bodyDto,userData,postId)
    },
    async updateComment(bodyDto:CommentInputModel,commentId:string):Promise<boolean>{

        return await CommentsRepositories.update(bodyDto,commentId)
    },
    async deleteComment(commentId:string):Promise<boolean>{

        return CommentsRepositories.delete(commentId)
    }
}