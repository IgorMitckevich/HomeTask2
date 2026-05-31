import 'reflect-metadata';
import {BlogsRepositories} from "./blogs/repositories/blogs.repostirories";
import {QueryBlogsRepositories} from "./blogs/repositories/query-blogs-repositories";
import {BlogsService} from "./blogs/application/blogsService";
import {CommentsService} from "./comment/application/comments-service";
import {CommentsRepositories} from "./comment/repositories/comments-repositoriest";
import {QueryCommentsRepositories} from "./comment/repositories/query-comment-repostitories";
import {BcryptService} from "./login/application/bcrypt-service";
import {JwtService} from "./login/application/jwt-service";
import {refreshTokenList} from "./login/application/refresh-token-service";
import {nodemailerApplication} from "./login/nodemaierService/sendEmail";
import {PostsService} from "./posts/application/posts.service";
import {PostsRepostirories} from "./posts/repositories/posts.repostirories";
import {QueryPostsRepositories} from "./posts/repositories/query-posts-repositories";
import {queryRepositories} from "./security/repositories/query-repositories";
import {DeviceService} from "./security/application/session-device-service";
import {usersApplication} from "./users/application/users-service";
import {QueryUsersRepositories} from "./users/repositories/query-user-repositories";
import {UsersRepository} from "./users/repositories/users-repository";
import {BlogController} from "./blogs/routers/Blog-controller";
import {Container} from 'inversify';


export const container=new Container();

export const blogsRepositories=new BlogsRepositories()
export const queryBlogsRepositories=new QueryBlogsRepositories();
export const blogsService=new BlogsService(blogsRepositories);
export const blogController=new BlogController();

export const commentsRepositories=new CommentsRepositories();
export const queryCommentsRepositories=new QueryCommentsRepositories();
export const commentsService=new CommentsService(commentsRepositories);

export const bcryptService=new BcryptService();
export const jwtService=new JwtService();
export const refreshTokenService = new refreshTokenList();
export const nodemailerService = new nodemailerApplication();

export const postsRepositories=new PostsRepostirories();
export const queryPostsRepositories=new QueryPostsRepositories();
export const postsService=new PostsService();

export const queryDeviceRepositories=new queryRepositories();
export const sessionDeviceService=new DeviceService();

export const queryUsersRepositories=new QueryUsersRepositories();
export const usersRepository=new UsersRepository();
export const usersService = new usersApplication();