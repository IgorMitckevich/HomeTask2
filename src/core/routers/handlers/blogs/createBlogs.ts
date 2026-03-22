import {Response,Request} from "express";
import {FieldError} from "../../../types/ErrorsModel";
import {HttpStatus} from "../../../https-statuses/httpStatuses";
import {BlogViewModel} from "../../../types/blogersModel";
import {blogs} from "../../../../db/dbBlogs";

export function createBlog(req: Request, res: Response) {

    const newBlog:BlogViewModel = {
        id: blogs.length ? blogs[blogs.length - 1].id + '1' : '1',
        name:req.body.name,
        description:req.body.description,
        websiteUrl:req.body.websiteUrl
    }


    blogs.push(newBlog);

    res.status(HttpStatus.Created).send(blogs[blogs.length-1]);
}