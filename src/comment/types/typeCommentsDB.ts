import {CommentatorInfo} from "./CommentatorInfo";


export type CommentsDB = {
    id:string,
    content:string,
    commentatorInfo:CommentatorInfo,
    createdAt:string,
    postId:string,
}