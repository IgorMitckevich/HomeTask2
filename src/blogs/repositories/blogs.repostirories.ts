import { BlogInputModel, BlogViewModel } from "../../core/types/blogersModel";
import { blogsCollection} from "../../db/mongo.db";
import {ObjectId,WithId} from "mongodb";


export const blogsRepostirories = {
  async findAll(): Promise<WithId<BlogViewModel>[]> {

    return blogsCollection.find({},{projection:{_id:0}}).toArray();
  },
  async findById(id: string): Promise<WithId<BlogViewModel>| null> {

    return blogsCollection.findOne({id:id},{projection:{_id:0}});
  },
  async create(newBlog: BlogViewModel):Promise<WithId<BlogViewModel>> {

    const BlogToInsert= {
      id: newBlog.id,
      name: newBlog.name,
      description: newBlog.description,
      websiteUrl: newBlog.websiteUrl,
      createdAt: newBlog.createdAt,
      isMembership: newBlog.isMembership
    }

    const insertBlogs= await blogsCollection.insertOne(BlogToInsert);

    return {...BlogToInsert,_id:insertBlogs.insertedId};
  },
  async update(id: string, blogsInputBody: BlogInputModel): Promise<void> {

    const updateResult= await blogsCollection.updateOne(
        {id: id},{
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
  const deleteResult= await blogsCollection.deleteOne({id:id});
  if(deleteResult.deletedCount<1){
    throw new Error("blogs not found");
  }
    return
  }
};
