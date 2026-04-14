import {UserViewModel} from "../types/UserViewModel";
import {usersCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {UserInputModel} from "../types/UserInputModel";
import {PaginatorInput} from "../types/Paginator-input";
import {UserViewModelWithPassword} from "../types/UserViewModelWithPassword";

export const usersRepository={
    async  getAllUsers(queryDto:PaginatorInput):Promise<{items:WithId<UserViewModel>[];totalCount:number}>{
        const {searchLoginTerm,searchEmailTerm,pageNumber, pageSize, sortBy, sortDirection} = queryDto;
        // const filter:any= {};
        const skip = (pageNumber - 1) * pageSize;

        const searchConditions=[]
        if(searchLoginTerm){
            searchConditions.push({login:{$regex:searchLoginTerm,$options:"i"}})

        }
        if(searchEmailTerm){
            searchConditions.push({email:{$regex:searchEmailTerm,$options:"i"}})
        }
        const filter = searchConditions.length > 0 ? { $or: searchConditions } : {};
        const [items,totalCount] = await Promise.all([
            usersCollection
                .find(filter)
                .sort({[sortBy]: sortDirection})
                .skip(skip)
                .limit(pageSize)
                .toArray(),
            usersCollection.countDocuments(filter),
        ]);

        return {items,totalCount}


    },
    async create(newUser:UserInputModel):Promise<WithId<UserViewModel>|null>{

        const newUserInputBD={...newUser,id:new ObjectId().toString(),createdAt:new Date().toISOString()}
        const CreatedNewUser= await usersCollection.insertOne(newUserInputBD);
        const UserFromBD=await this.findUserByID(CreatedNewUser.insertedId)

         return UserFromBD


    },
    async deleteUser(userId:string):Promise<boolean>{

        const deleteUserById=await usersCollection.deleteOne({id:userId})
        if(deleteUserById.deletedCount<1){
            return false
        }
        return true;
    },
    async findUserByEmail(email:string):Promise<boolean>{

        const UserEmail= await usersCollection.findOne({email:email})
        if(UserEmail){
            return true
        }
        return false;

    },
    async findUserByID(id:ObjectId):Promise<WithId<UserViewModel>|null>{
        const User=await usersCollection.findOne({_id:id},{projection:{password:0}})
        return User
    },
    async findUserByLoginOrEmail(loginOrEmail:string):Promise<WithId<UserViewModelWithPassword>|null>{


        return usersCollection.findOne({$or:[{email:loginOrEmail},{login:loginOrEmail}]})
    }


}