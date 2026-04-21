import {usersCollection} from "../../db/mongo.db";
import { WithId} from "mongodb";
import {UserViewModel} from "../types/UserViewModel";
import {PaginatorInput} from "../types/Paginator-input";
import {bcryptService} from "../../login/application/bcrypt-service";
import {AuthMe} from "../../login/type/MeViewModel";


export const queryUsersRepositories = {
    async getUsers(queryDto:PaginatorInput):Promise<{items:WithId<UserViewModel>[];totalCount:number}> {
        const {searchLoginTerm,searchEmailTerm,pageNumber, pageSize, sortBy, sortDirection} = queryDto;
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
    async getUserByEmail(email:string):Promise<boolean>{

        const UserEmail= await usersCollection.findOne({email:email})
        if(UserEmail){
            return true
        }
        return false;

    },
    async getUserByID(id:string):Promise<AuthMe|null>{
        const user=await usersCollection.findOne({id:id},{projection:{password:0}})
        if(!user){
            return null;
        }

        return {
            email:user.email,
            login:user.login,
            userId:user.id

        }
    },
    async getUserByLoginOrEmail(loginOrEmail:string,password:string):Promise<UserViewModel|null>{

        const user= await usersCollection.findOne({$or:[{email:loginOrEmail},{login:loginOrEmail}]});
        if(!user){
            return null;
        }

        const checkPassword=await bcryptService.checkPassword(password,user.password);
        if(!checkPassword){
            return null;
        }

        return {
            id:user.id,
            login:user.login,
            email:user.email,
            createdAt:user.createdAt,

        }
    }

}