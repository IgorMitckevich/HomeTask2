import {commentsCollection} from "../../db/mongo.db";
import {QueryCommentsRepositories} from "./query-comment-repostitories";
import {CommentViewModel} from "../types/CommentViewModel";
import {ObjectId, WithId} from "mongodb";
import {CommentInputModel} from "../types/CommentInputModel";
import {AuthMe} from "../../login/type/MeViewModel";
import {CommentsDB} from "../types/typeCommentsDB";




export const CommentsRepositories={
    async create(bodyDto:CommentInputModel,userData:AuthMe,postId:string):Promise<WithId<CommentViewModel>|null>{

        const createComment=await commentsCollection.insertOne({
            id:new ObjectId().toString(),
            content:bodyDto.content,
            createdAt: new Date().toISOString(),
            commentatorInfo:{
                userId:userData.userId,
                userLogin:userData.login,
            },
            postId:postId
        });

        const commentId=createComment.insertedId;
        const comment=await commentsCollection.findOne({_id:commentId},{projection:{postId:0}});

        return comment


    },
    async delete(commentId:string):Promise<boolean>{
        const deletedComment=await commentsCollection.deleteOne({id:commentId})
        if(deletedComment.deletedCount<1){
            return false
        }
        return true
    },
    async update(bodyDto:CommentInputModel,commentId:string):Promise<boolean>{



        const updatedComment=await commentsCollection.updateOne({id:commentId}, {$set:{content:bodyDto.content}});

        if(updatedComment.matchedCount<1 ){
            return false
        }

        return true

    }
}