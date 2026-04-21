import {PaginatedOutput} from "../../core/types/Paginated-output";
import {WithId} from "mongodb";
import {BlogViewModel} from "../types/blogersModel";
import {blogsCollection} from "../../db/mongo.db";


export const queryBlogsRepositories={
    async getAllBlogs(queryDto:PaginatedOutput): Promise<{items:WithId<BlogViewModel>[];totalCount:number}> {

        const {searchNameTerm,pageNumber, pageSize, sortBy, sortDirection} = queryDto;
        const filter:any= {};
        const skip = (pageNumber - 1) * pageSize;
        if(searchNameTerm){
            filter.name={$regex:searchNameTerm,$options:"i"}
        }
        const [items,totalCount] = await Promise.all([
            blogsCollection
                .find(filter)
                .sort({[sortBy]: sortDirection})
                .skip(skip)
                .limit(pageSize)
                .toArray(),
            blogsCollection.countDocuments(filter),
        ]);
        return {items,totalCount}
    },
    async getBlogById(id: string): Promise<WithId<BlogViewModel>| null> {

        return blogsCollection.findOne({id:id},{projection:{_id:0}});
    }
}