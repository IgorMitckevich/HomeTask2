import {PostInputModel, PostViewModel} from "../types/postsModel";
import { WithId} from "mongodb";
import {PaginatedOutput} from "../../core/types/Paginated-output";
import {postsRepostirories} from "../repositories/posts.repostirories";

export const postsService = {
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