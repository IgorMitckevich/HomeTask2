import "reflect-metadata";
import {Container} from "inversify";
import {QueryBlogsRepositories} from "./blogs/repositories/query-blogs-repositories";
import {BlogsService} from "./blogs/application/blogsService";
import {CommentsService} from "./comment/application/comments-service";
import {CommentsRepositories} from "./comment/repositories/comments-repositoriest";
import {QueryCommentsRepositories} from "./comment/repositories/query-comment-repostitories";
import {BcryptService} from "./login/application/bcrypt-service";
import {JwtService} from "./login/application/jwt-service";
import {NodemailerService} from "./login/nodemaierService/sendEmail";
import {PostsService} from "./posts/application/posts.service";
import {PostsRepostirories} from "./posts/repositories/posts.repostirories";
import {QueryPostsRepositories} from "./posts/repositories/query-posts-repositories";
import {UsersService} from "./users/application/users-service";
import {QueryUsersRepositories} from "./users/repositories/query-user-repositories";
import {UsersRepository} from "./users/repositories/users-repository";
import {BlogController} from "./blogs/routers/Blog-controller";
import {CommentsController} from "./comment/routers/comments-controller";
import {PostsController} from "./posts/routers/posts-controller";
import {UsersController} from "./users/routes/users-controller";
import {Authentication} from "./login/routers/authentication";
import {DeviceController} from "./security/router/device-controller";
import {QueryDevicesRepositories} from "./security/repositories/query-devices-repositories";
import {DevicesService} from "./security/application/session-device-service";
import {RefreshTokenService} from "./login/application/refresh-token-service";
import {BlogsRepositories} from "./blogs/repositories/blogsRepositories";


export const container=new Container();

container.bind(BlogsRepositories).to(BlogsRepositories);
container.bind(QueryBlogsRepositories).to(QueryBlogsRepositories);
container.bind(BlogsService).to(BlogsService)
container.bind(BlogController).to(BlogController)

container.bind(CommentsRepositories).toSelf();
container.bind(QueryCommentsRepositories).toSelf();
container.bind(CommentsService).toSelf();
container.bind(CommentsController).toSelf();

container.bind(PostsRepostirories).toSelf();
container.bind(QueryPostsRepositories).toSelf();
container.bind(PostsService).toSelf();
container.bind(PostsController).toSelf();

container.bind(BcryptService).toSelf();
container.bind(JwtService).toSelf();
container.bind(QueryUsersRepositories).toSelf();
container.bind(UsersRepository).toSelf();
container.bind(UsersService).toSelf();
container.bind(UsersController).toSelf();

container.bind(NodemailerService).toSelf();
container.bind(Authentication).toSelf();

container.bind(RefreshTokenService).toSelf();
container.bind(QueryDevicesRepositories).toSelf();
container.bind(DevicesService).toSelf();
container.bind(DeviceController).toSelf();
