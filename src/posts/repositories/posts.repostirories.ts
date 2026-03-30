import {PostInputModel, PostViewModel} from "../../core/types/postsModel";
import { postsCollection } from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";


export const postsRepostirories = {
    async findAll(): Promise<WithId<PostViewModel>[]> {
        return postsCollection.find().toArray();
    },
    async findById(id: string): Promise<WithId<PostViewModel>|null> {

        return postsCollection.findOne({_id: new ObjectId(id)});
    },
    async create(newPosts: PostViewModel):Promise<WithId<PostViewModel>> {
        const createPost=await postsCollection.insertOne(newPosts);
        return {...newPosts, _id:createPost.insertedId};
    },
    async update(id: string, postsInputBody: PostInputModel): Promise<void> {

        const updatePost=await postsCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set:{
                title:postsInputBody.title,
                shortDescription:postsInputBody.shortDescription,
                content:postsInputBody.content,
                blogId:postsInputBody.blogId,
                    }
            }
        );

        if (updatePost.matchedCount<1) {
            throw new Error("blogs not found");
        }

        return;
    },
    async delete(id:string):Promise<void>{
    const deletePost=await postsCollection.deleteOne({_id:new ObjectId(id)})
    if(deletePost.deletedCount<1){
        throw new Error("blogs not found");
    }
        return;
    }
};
