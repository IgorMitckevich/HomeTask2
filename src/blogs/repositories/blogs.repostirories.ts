import {BlogInputModel, BlogViewModel} from "../../core/types/blogersModel";
import {blogs} from "../../db/dbBlogs"

export const blogsRepostirories = {
    findAll(): BlogViewModel[]{
        return blogs
    },
    findById(id: string): BlogViewModel{
        return blogs[+id];
    },
    create(newBlog:BlogViewModel){
        blogs.push(newBlog);
        return newBlog;
    },
    update(id:string,blogsInputBody:BlogInputModel):void{
        if(!blogs){
            throw new Error("blogs not found");
        }
        const idNumber=Number(id);
        blogs[idNumber].name=blogsInputBody.name;
        blogs[idNumber].description=blogsInputBody.description;
        blogs[idNumber].websiteUrl=blogsInputBody.websiteUrl;
            return;
    }
}

