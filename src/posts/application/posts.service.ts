import {PostInputModel, PostViewModel} from "../types/postsModel";
import { WithId} from "mongodb";
import {PaginatedOutput} from "../../core/types/Paginated-output";
import {postsRepostirories} from "../repositories/posts.repostirories";

export const postsService = {
    async findAll(queryDto:PaginatedOutput): Promise<{items:WithId<PostViewModel>[];totalCount:number}> {


        return postsRepostirories.findAll(queryDto);
    },
    async findById(id: string): Promise<WithId<PostViewModel>|null> {

        return postsRepostirories.findById(id);
    },
    async findPostsByBlogId(queryDto:PaginatedOutput,blogsId:string):Promise<{items:WithId<PostViewModel>[];totalCount:number}>{


        return postsRepostirories.findPostsByBlogId(queryDto,blogsId)
    },
    async create(newPosts: PostViewModel):Promise<WithId<PostViewModel>> {

        return  await postsRepostirories.create(newPosts) ;
    },
    async update(id: string, postsInputBody: PostInputModel): Promise<void> {

        await postsRepostirories.update(id, postsInputBody);
        return;
    },
    async delete(id:string):Promise<void>{
        await postsRepostirories.delete(id);
        return;
    }
};