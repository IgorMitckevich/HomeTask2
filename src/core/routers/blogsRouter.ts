import express,{Request,Response} from 'express';
import {HttpStatus} from "../https-statuses/httpStatuses";
import {blogs} from "../db/dbBlogs"
import {BlogViewModel} from "../types/blogersModel";

export const blogsRouter = express.Router();

blogsRouter.
get('/', (req: Request, res: Response) => {

    res.status(HttpStatus.Ok).send(blogs);
})
.get(`/:id`, (req: Request, res: Response) => {
    const blogsId=req.params.id;
    if(!blogsId){
        res.status(HttpStatus.NotFound).send('No blog found');
        return;
    }
    const blogWithSeacrhedId:BlogViewModel|undefined=blogs.find(blog=>blog.id===blogsId);
    if(!blogWithSeacrhedId){
        res.status(HttpStatus.NotFound).send('No blog found');
        return;
    }

    res.status(HttpStatus.Ok).send(blogWithSeacrhedId);
})
.post('/', (req: Request, res: Response) => {



    res.status(HttpStatus.Created).send(blogs);
})