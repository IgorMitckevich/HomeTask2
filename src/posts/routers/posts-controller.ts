import {Request, Response} from "express";
import {CommentInputModel} from "../../comment/types/CommentInputModel";
import {HttpStatus} from "../../core/https-statuses/httpStatuses";
import {PostInputModel, PostViewModel} from "../types/postsModel";
import {ObjectId, WithId} from "mongodb";
import {postsMap} from "./mappers/postsMap";
import {matchedData} from "express-validator";
import {PaginatedOutput} from "../../core/types/Paginated-output";
import {mapPostsPaginated} from "./mappers/map-posts-list-paginated-output";
import {mapCommentsPagination} from "./mappers/map-comments";
import {inject, injectable} from "inversify";
import {PostsService} from "../application/posts.service";
import {QueryPostsRepositories} from "../repositories/query-posts-repositories";
import {QueryUsersRepositories} from "../../users/repositories/query-user-repositories";
import {QueryBlogsRepositories} from "../../blogs/repositories/query-blogs-repositories";
import {QueryCommentsRepositories} from "../../comment/repositories/query-comment-repostitories";
import {CommentsService} from "../../comment/application/comments-service";
import {CommentViewModel} from "../../comment/types/CommentViewModel";

@injectable()
export class PostsController{
    constructor(@inject(PostsService) protected postsService:PostsService,
                @inject(QueryPostsRepositories) protected queryPostsRepositories:QueryPostsRepositories,
                @inject(QueryUsersRepositories) protected queryUsersRepositories:QueryUsersRepositories,
                @inject(QueryBlogsRepositories) protected queryBlogsRepositories:QueryBlogsRepositories,
                @inject(QueryCommentsRepositories) protected queryCommentsRepositories:QueryCommentsRepositories,
                @inject(CommentsService) protected commentsService:CommentsService){

    }

    async  createComments(
        req: Request<{ postId: string }, {}, CommentInputModel>,
        res: Response,
    ) {
        try {
            const postId = req.params.postId;
            const userId = req.user.id;
            const checkPost = await this.queryPostsRepositories.getPostById(postId);
            const checkUser = await this.queryUsersRepositories.getUserByID(userId);

            if (!checkPost) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }
            if (!checkUser) {
                res.sendStatus(HttpStatus.Forbidden);
                return;
            }

            const contentBody = req.body;
            const createdComment = await this.commentsService.createComment(
                contentBody,
                checkUser,
                postId,
            );

            if (!createdComment) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }
            const commentViewModel: CommentViewModel = {
                id: createdComment.id,
                content: createdComment.content,
                createdAt: createdComment.createdAt,
                commentatorInfo: createdComment.commentatorInfo,
            };

            res.status(HttpStatus.Created).send(commentViewModel);
        } catch (err) {}
    }

    async createPosts(
        req: Request<{}, {}, PostInputModel>,
        res: Response,
    ): Promise<void> {
        try {
            const blogId = req.body.blogId;

            const FoundedBlog = await this.queryBlogsRepositories.getBlogById(blogId);
            if (!FoundedBlog) {
                res.sendStatus(HttpStatus.BadRequest);
                return;
            }

            const newPost: PostViewModel = {
                id: new ObjectId().toString(),
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                blogId: FoundedBlog.id,
                blogName: FoundedBlog.name,
                createdAt: new Date().toISOString(),
            };

            const NEWPost = await this.postsService.create(newPost);
            const PostViewModel = postsMap(NEWPost);

            res.status(HttpStatus.Created).send(PostViewModel);
        } catch (err) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }

    async deletePostsById(req: Request, res: Response) {
        try {
            const postId = req.params.id as string;

            const FoundedPost: WithId<PostViewModel> | null =
                await this.queryPostsRepositories.getPostById(postId);
            if (!FoundedPost) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }
            await this.postsService.delete(postId);
            res.sendStatus(HttpStatus.NoContent);
        } catch (err) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }

    async findAllPosts(req: Request, res: Response) {
        try {
            const sanitizedQuery = matchedData<PaginatedOutput>(req, {
                locations: ["query"],
                includeOptionals: true,
            });
            const queryInput = { ...sanitizedQuery };
            const posts = await this.queryPostsRepositories.getAllPosts(queryInput);
            if (!posts) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }

            const findedPosts = mapPostsPaginated(
                posts,
                queryInput.pageNumber,
                queryInput.pageSize,
            );

            res.status(HttpStatus.Ok).send(findedPosts);
        } catch (err) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }

    async findPostsById(req: Request, res: Response) {
        const id = req.params.id as string;
        if (!id) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        const FoundedPost: WithId<PostViewModel> | null =
            await this.queryPostsRepositories.getPostById(id);
        if (!FoundedPost) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }

        res.status(HttpStatus.Ok).send(FoundedPost);
    }

    async getCommentsByPostId  (
        req: Request<{ postId: string }, {}, {}, PaginatedOutput>,
        res: Response,
    )  {
        try {
            const postId = req.params.postId;

            const checkPost = await this.queryPostsRepositories.getPostById(postId);
            if (!checkPost) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }
            const sanitizedQuery = matchedData<PaginatedOutput>(req, {
                locations: ["query"],
                includeOptionals: true,
            });
            const queryInput = {
                pageNumber: sanitizedQuery.pageNumber,
                pageSize: sanitizedQuery.pageSize,
                sortBy: sanitizedQuery.sortBy,
                sortDirection: sanitizedQuery.sortDirection,
            };

            const getComments = await this.queryCommentsRepositories.get(queryInput, postId);
            const pagginationComments = mapCommentsPagination(
                getComments,
                queryInput.pageNumber,
                queryInput.pageSize,
            );

            res.status(HttpStatus.Ok).send(pagginationComments);
        } catch (e) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }

    async updatePostsById(
        req: Request<{ id: string }, {}, PostInputModel>,
        res: Response,
    ) {
        try {
            const id = req.params.id as string;

            const FoundedPost: WithId<PostViewModel> | null =
                await this.queryPostsRepositories.getPostById(id);
            if (!FoundedPost) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }
            await this.postsService.update(id, req.body);

            res.sendStatus(HttpStatus.NoContent);
        } catch (err) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }

}