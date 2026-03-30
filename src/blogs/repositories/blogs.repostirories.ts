import { BlogInputModel, BlogViewModel } from "../../core/types/blogersModel";
import { blogsCollection} from "../../db/mongo.db";
import {ObjectId,WithId} from "mongodb";
import {blogsMap} from "../../core/routers/mappers/blogsMap";

export const blogsRepostirories = {
  async findAll(): Promise<WithId<BlogViewModel>[]> {

    return blogsCollection.find().toArray();
  },
  async findById(id: string): Promise<WithId<BlogViewModel>| null> {

    return blogsCollection.findOne({_id: new ObjectId(id)});
  },
  async create(newBlog: BlogViewModel):Promise<WithId<BlogViewModel>> {
    const insertBlogs= await blogsCollection.insertOne(newBlog);
    return {...newBlog,_id:insertBlogs.insertedId};
  },
  async update(id: string, blogsInputBody: BlogInputModel): Promise<void> {

    const updateResult= await blogsCollection.updateOne(
        {_id: new ObjectId(id)},{
    $set:{
      name : blogsInputBody.name,
     description : blogsInputBody.description,
      websiteUrl : blogsInputBody.websiteUrl
    }
    })
    if (updateResult.matchedCount<1) {
      throw new Error("blogs not found");
    }

    return;
  },
  async delete(id:string):Promise<void>{
  const deleteResult= await blogsCollection.deleteOne({_id:new ObjectId(id),});
  if(deleteResult.deletedCount<1){
    throw new Error("blogs not found");
  }
    return
  }
};
