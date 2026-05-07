import { PostsPaginated } from "../../types/postPaginated";
import { WithId } from "mongodb";
import { PostViewModel } from "../../types/postsModel";
import { postsMap } from "./postsMap";
import { postsMapArray } from "./map-posts-array";
import { Pagginator } from "../../../common/pagginator-View-Model";

// export function mapPostsPaginated(posts:{items:WithId<PostViewModel>[];totalCount:number}, pagesNumber:number,pageSize:number):PostsPaginated{
//
//
//
//     return {
//         items: postsMapArray(posts.items),
//         pagesCount:Math.ceil(posts.totalCount/pageSize),
//         pageSize:pageSize,
//         page:pagesNumber ,
//         totalCount:posts.totalCount
//     }
//
//
// }

export function mapPostsPaginated(
  posts: { items: WithId<PostViewModel>[]; totalCount: number },
  pagesNumber: number,
  pageSize: number,
): Pagginator<PostViewModel> {
  return {
    items: postsMapArray(posts.items),
    pagesCount: Math.ceil(posts.totalCount / pageSize),
    pageSize: pageSize,
    page: pagesNumber,
    totalCount: posts.totalCount,
  };
}
