
import { WithId} from "mongodb"

import {PostViewModel} from "../../types/postsModel";


export function  postsMapArray(items:WithId<PostViewModel>[]):PostViewModel[] {

    let posts: PostViewModel[] = [];

    for (let i = 0; i < items.length; i++) {
        posts.push({
            id: items[i].id,
            title: items[i].title,
            shortDescription: items[i].shortDescription,
            content: items[i].content,
            blogId: items[i].blogId,
            blogName: items[i].blogName,
            createdAt: items[i].createdAt
        })
    }

    return posts
}