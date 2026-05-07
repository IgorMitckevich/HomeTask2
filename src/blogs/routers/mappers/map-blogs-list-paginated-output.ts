import { BlogsPaginated } from "../../../blogs/types/blogPaginated";

import { WithId } from "mongodb";
import { BlogViewModel } from "../../types/blogersModel";
import { blogsMapArray } from "./map-blogs-Array";
import { Pagginator } from "../../../common/pagginator-View-Model";

// export function mapBlogsPaginated(blog:{items:WithId<BlogViewModel>[];totalCount:number}, pagesNumber:number,pageSize:number):BlogsPaginated{
//
//
//     return {
//         items:blogsMapArray(blog.items),
//         pagesCount:Math.ceil(blog.totalCount/pageSize),
//         pageSize:pageSize,
//         page:pagesNumber,
//         totalCount:blog.totalCount
//
//     }
//
//
// }

export function mapBlogsPaginated(
  blog: { items: WithId<BlogViewModel>[]; totalCount: number },
  pagesNumber: number,
  pageSize: number,
): Pagginator<BlogViewModel> {
  return {
    items: blogsMapArray(blog.items),
    pagesCount: Math.ceil(blog.totalCount / pageSize),
    pageSize: pageSize,
    page: pagesNumber,
    totalCount: blog.totalCount,
  };
}
