import {Request, Response} from "express";
import {PaginatedOutput} from "../../core/types/Paginated-output";
import {matchedData} from "express-validator";
import {
    blogsService,
    queryBlogsRepositories,
    queryPostsRepositories
} from "../../common/composition-root";
import {mapBlogsPaginated} from "./mappers/map-blogs-list-paginated-output";
import {HttpStatus} from "../../core/https-statuses/httpStatuses";
import {BlogInputModel, BlogViewModel} from "../types/blogersModel";
import {ObjectId, WithId} from "mongodb";
import {blogsMap} from "./mappers/blogsMap";
import {PostsQueryInput} from "../../posts/types/posts-query-input";
import {PostsPaginated} from "../../posts/types/postPaginated";
import {mapPostsPaginated} from "../../posts/routers/mappers/map-posts-list-paginated-output";

export class BlogController{
    async findAllBlogs(
        req: Request<{}, {}, {}, PaginatedOutput>,
        res: Response,
    ): Promise<void> {
        const sanitizedQuery = matchedData<PaginatedOutput>(req, {
            locations: ["query"],
            includeOptionals: true,
        });
        const queryInput = { ...sanitizedQuery };
        const blogs = await queryBlogsRepositories.getAllBlogs(queryInput);
        const BlogsViewModel = mapBlogsPaginated(
            blogs,
            queryInput.pageNumber,
            queryInput.pageSize,
        );
        res.status(HttpStatus.Ok).send(BlogsViewModel);
    }
    async getBlogById(
        req: Request,
        res: Response,
    ): Promise<BlogViewModel | void> {
        const blogsId: string = req.params.id as string;
        if (!blogsId) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        const blogFind: WithId<BlogViewModel> | null =
            await queryBlogsRepositories.getBlogById(blogsId);

        if (!blogFind) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }

        res.status(HttpStatus.Ok).send(blogFind);
    }

    async createBlog(
        req: Request<{}, {}, BlogInputModel>,
        res: Response,
    ): Promise<void> {
        try{
            const newBlog: BlogViewModel = {
                id: new ObjectId().toString(),
                name: req.body.name,
                description: req.body.description,
                websiteUrl: req.body.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false,
            };

            const createBlog = await blogsService.create(newBlog);
            const BlogsViewModel = blogsMap(createBlog);
            res.status(HttpStatus.Created).send(BlogsViewModel);
        } catch (error) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }
    async updateBlogById(
        req: Request<{ id: string }, {}, BlogInputModel>,
        res: Response,
    ): Promise<void> {
        try {
            const id = req.params.id as string;

            const FoundedBlog: WithId<BlogViewModel> | null =
                await queryBlogsRepositories.getBlogById(id);
            if (!FoundedBlog) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }
            await blogsService.update(id, req.body);

            res.sendStatus(HttpStatus.NoContent);
        } catch (error) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }
    async getAllPostsByBlogId(
        req: Request<{ blogId: string }, {}, {}, PostsQueryInput>,
        res: Response,
    ): Promise<any> {
        try {
            const blogsId = req.params.blogId;

            const findBlog = await queryBlogsRepositories.getBlogById(blogsId);
            if (!findBlog) {
                return res.sendStatus(HttpStatus.NotFound);
            }
            const sanitizedQuery = matchedData<PaginatedOutput>(req, {
                locations: ["query"],
                includeOptionals: true,
            });
            const queryInput = { ...sanitizedQuery };

            const posts = await queryPostsRepositories.getPostsByBlogId(
                queryInput,
                blogsId,
            );

            const postsOutput: PostsPaginated = mapPostsPaginated(
                posts,
                queryInput.pageNumber,
                queryInput.pageSize,
            );

            res.status(HttpStatus.Ok).send(postsOutput);
        } catch (e) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }
     async  deleteBlogsById(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const id: string = req.params.id as string;

            const FoundedBlog: WithId<BlogViewModel> | null =
                await queryBlogsRepositories.getBlogById(id);
            if (!FoundedBlog) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }

            await blogsService.delete(id);
            res.sendStatus(HttpStatus.NoContent);
        } catch (error) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }
}