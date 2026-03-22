import express from 'express';
import {findAllBlogs} from "./handlers/blogs/findAllBlogs";
import {getBlogById} from "./handlers/blogs/findBlogsById";
import {createBlog} from "./handlers/blogs/createBlogs";
import {adminGuard} from "../middlewares/admin.guard";
import {blogsValidation} from "../middlewares/validation/blogs/blogs.validation";
import {deleteBlogsById} from "./handlers/blogs/deleteBlogsById";
import {updateBlogById} from "./handlers/blogs/updateBlogs";
import {inputValidationResultMiddleware} from "../middlewares/validation/inputValidationBlogs";

export const blogsRouter = express.Router();

blogsRouter
    .get('/', findAllBlogs)
.get(`/:id`,getBlogById)
.post('/', adminGuard,blogsValidation,inputValidationResultMiddleware, createBlog)
.put(`/:id`,adminGuard,blogsValidation,inputValidationResultMiddleware, updateBlogById)
.delete(`/:id`,adminGuard,deleteBlogsById)