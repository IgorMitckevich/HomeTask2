
import {ObjectId, WithId} from "mongodb"

import {BlogViewModel} from "../../types/blogersModel";


export function  blogsMap(blog:WithId<BlogViewModel>):BlogViewModel {


     return { id: blog.id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership}
}