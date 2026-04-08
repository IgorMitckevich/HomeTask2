import { BlogInputModel, BlogViewModel } from "../types/blogersModel";
import { blogsCollection} from "../../db/mongo.db";
import {ObjectId,WithId} from "mongodb";
import {PaginatedOutput} from "../../core/types/Paginated-output";


export const blogsRepostirories = {
  async findAll(queryDto:PaginatedOutput): Promise<{items:WithId<BlogViewModel>[];totalCount:number}> {

      const {searchNameTerm,pageNumber, pageSize, sortBy, sortDirection} = queryDto;
      const filter:any= {};
      const skip = (pageNumber - 1) * pageSize;
    if(searchNameTerm){
        filter.name={$regex:searchNameTerm,$options:"i"}
    }
      const [items,totalCount] = await Promise.all([
        blogsCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray(),
        blogsCollection.countDocuments(filter),
      ]);
      // return blogsCollection.find({},{projection:{_id:0}}).toArray();
    return {items,totalCount}
     },
  async findById(id: string): Promise<WithId<BlogViewModel>| null> {

    return blogsCollection.findOne({id:id},{projection:{_id:0}});
  },
  async create(newBlog: BlogViewModel):Promise<WithId<BlogViewModel>> {


    const insertBlogs= await blogsCollection.insertOne(newBlog);

    return {...newBlog,_id:insertBlogs.insertedId};
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
