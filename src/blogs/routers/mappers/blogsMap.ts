
import {ObjectId, WithId} from "mongodb"

import {BlogViewModel} from "../../types/blogersModel";
import {PostsPaginated} from "../../../posts/types/postPaginated";
import {mapPostsPaginated} from "../../../posts/routers/mappers/map-posts-list-paginated-output";


export function  blogsMap(blog:WithId<BlogViewModel>):BlogViewModel {


     return { id: blog.id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership}
}

