import {BlogsPaginated} from "../../../blogs/types/blogPaginated";

import {WithId} from "mongodb";
import {BlogViewModel} from "../../types/blogersModel";
import {blogsMapArray} from "./map-blogs-Array";


export function mapBlogsPaginated(blog:{items:WithId<BlogViewModel>[];totalCount:number}, pagesNumber:number,pageSize:number):BlogsPaginated{


    return {
        items:blogsMapArray(blog.items),
        pagesCount:Math.ceil(blog.totalCount/pageSize),
        pageSize:pageSize,
        page:pagesNumber,
        totalCount:blog.totalCount

    }


}