
import { WithId} from "mongodb"

import {BlogViewModel} from "../../types/blogersModel";


export function  blogsMap(blog:WithId<BlogViewModel>):BlogViewModel {
   return { id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        created_at: blog.created_at,
        isMembership: blog.isMembership}
}