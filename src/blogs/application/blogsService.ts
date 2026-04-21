import { BlogInputModel, BlogViewModel } from "../types/blogersModel";
import { blogsCollection} from "../../db/mongo.db";
import {ObjectId,WithId} from "mongodb";
import {PaginatedOutput} from "../../core/types/Paginated-output";
import {blogsRepostirories} from "../repositories/blogs.repostirories";


export const blogsService = {
    async create(newBlog: BlogViewModel):Promise<WithId<BlogViewModel>> {

        const BlogToInsert= {
            id: newBlog.id,
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: newBlog.createdAt,
            isMembership: newBlog.isMembership
        }
        return blogsRepostirories.create(BlogToInsert)
    },
    async update(id: string, blogsInputBody: BlogInputModel): Promise<void> {

         await blogsRepostirories.update(id,blogsInputBody)

        return;
    },
    async delete(id:string):Promise<void>{
        await blogsRepostirories.delete(id);

        return
    }
};
