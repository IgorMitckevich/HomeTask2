import express,{Request,Response} from 'express';
import {HttpStatus} from "../https-statuses/httpStatuses";
import {blogs} from "../../db/dbBlogs"
import {BlogViewModel} from "../types/blogersModel";
import {FieldError} from "../types/ErrorsModel";
import {findAllBlogs} from "./handlers/blogs/findAllBlogs";
import {getBlogById} from "./handlers/blogs/findBlogsById";
import {createBlog} from "./handlers/blogs/createBlogs";
import {adminGuard} from "../middlewares/admin.guard";
import {blogsValidation} from "../middlewares/validation/blogs/blogs.validation";
import {deleteBlogsById} from "./handlers/blogs/deleteBlogsById";
import {updateBlogById} from "./handlers/blogs/updateBlogs";

export const blogsRouter = express.Router();

blogsRouter
    .get('/', findAllBlogs)
.get(`/:id`,getBlogById)
.post('/', adminGuard,blogsValidation, createBlog)
.put(`/:id`,adminGuard,blogsValidation, updateBlogById)
.delete(`/:id`,adminGuard,deleteBlogsById)