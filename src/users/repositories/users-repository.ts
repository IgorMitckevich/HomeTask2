import {UserViewModel} from "../types/UserViewModel";
import {usersCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {UserInputModel} from "../types/UserInputModel";


export const usersRepository={
    async create(newUser:UserInputModel):Promise<WithId<UserViewModel>|null>{

        const newUserInputBD={...newUser,id:new ObjectId().toString(),createdAt:new Date().toISOString()}
        const CreatedNewUser= await usersCollection.insertOne(newUserInputBD);


         return {
             id:newUserInputBD.id,
            _id:CreatedNewUser.insertedId,
             login:newUserInputBD.login,
             email:newUserInputBD.email,
             createdAt:newUserInputBD.createdAt
         }


    },
    async deleteUser(userId:string):Promise<boolean>{

        const deleteUserById=await usersCollection.deleteOne({id:userId})
        if(deleteUserById.deletedCount<1){
            return false
        }
        return true;
    }


}