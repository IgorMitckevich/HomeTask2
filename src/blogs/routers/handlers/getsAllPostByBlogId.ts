import {Request, Response} from 'express';
import {DEFAULT_VALUEST} from "../../../core/middlewares/validation/query-pagination-sorting.vallidation-middleware";
import {PaginatedOutput} from "../../../core/types/Paginated-output";
import {postsService} from "../../../posts/application/posts.service";
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {blogsService} from "../../application/blogsService";
import {mapPostsPaginated} from "../../../posts/routers/mappers/map-posts-list-paginated-output";
import {PostsPaginated} from "../../../posts/types/postPaginated";
import {PostsQueryInput} from "../../../posts/types/posts-query-input";
import {matchedData} from "express-validator";

export async function getAllPostsByBlogId  (req:Request<{blogId:string},{},{},PostsQueryInput>, res:Response ):Promise<any>
{
    try{
        const blogsId= req.params.blogId;

        const findBlog= await blogsService.findById(blogsId);
            if(!findBlog){
                return res.sendStatus(HttpStatus.NotFound)

            }
        const sanitizedQuery = matchedData<PaginatedOutput>(req,{
            locations: ['query'],
            includeOptionals: true,})
        const queryInput={...sanitizedQuery};


        const posts=await postsService.findPostsByBlogId(queryInput,blogsId);
            // if(!posts){
            //     return res.status(HttpStatus.Ok).send({
            //         items:[],
            //         pageNumber:Number(queryInput.pageNumber),
            //         pageSize: Number(queryInput.pageSize),
            //         totalCount:0
            //     });
            // }

         const postsOutput:PostsPaginated=mapPostsPaginated(posts,queryInput.pageNumber, queryInput.pageSize)

        res.status(HttpStatus.Ok).send(postsOutput)
    }catch(e){
    res.sendStatus(HttpStatus.InternalServerError)
    }

}