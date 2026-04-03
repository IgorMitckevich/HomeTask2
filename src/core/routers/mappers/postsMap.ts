
import { WithId} from "mongodb"

import {PostViewModel} from "../../types/postsModel";


export function  postsMap(post:WithId<PostViewModel>):PostViewModel {
    return { id: post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
    createdAt: post.createdAt,}
}