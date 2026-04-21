import {WithId} from "mongodb";
import {Pagginator} from "../../../common/pagginator-View-Model";
import {CommentViewModel} from "../../../comment/types/CommentViewModel";





export function mapCommentsPagination(posts:{items:WithId<CommentViewModel>[];totalCount:number}, pagesNumber:number,pageSize:number):Pagginator<CommentViewModel>{

    const mapCommentViewModel:CommentViewModel[]=posts.items.map((com:WithId<CommentViewModel>)=> {
        return {
        id:com.id,
        content:com.content,
        commentatorInfo:com.commentatorInfo,
        createdAt:com.createdAt}
    })

    return {
        items: mapCommentViewModel,
        pagesCount:Math.ceil(posts.totalCount/pageSize),
        pageSize:pageSize,
        page:pagesNumber ,
        totalCount:posts.totalCount
    }


}