import {UserViewModel} from "../types/UserViewModel";
import {usersRepository} from "../repositories/users-repository";
import { WithId} from "mongodb";
import bcrypt from 'bcrypt'
import {UserInputModel} from "../types/UserInputModel";
import {PaginatorInput} from "../types/Paginator-input";

export const usersService={
    async  getAllUsers(queryDto:PaginatorInput):Promise<{items:WithId<UserViewModel>[];totalCount:number}>{
        return usersRepository.getAllUsers(queryDto)
    },
    async create(user:UserInputModel):Promise<WithId<UserViewModel>|null>{

        const CheckedEmail=await usersRepository.findUserByEmail(user.email);
        if(CheckedEmail){

            return null;
        }

        const passwordSalt=await bcrypt.genSalt(10);
        const passwordWithHash=await this.hashPassword(user.password,passwordSalt);

        const newUser:UserInputModel={
                login:user.login,
            email:user.email,
            password:passwordWithHash
        }
        return usersRepository.create(newUser)
    },
    async deleteUser(userId:string):Promise<boolean>{

        return await usersRepository.deleteUser(userId)
    },
    async hashPassword(password:any,salt:any){

        return  bcrypt.hash(password,salt);
    },
    async checkPassword(password:string,hash:string){
        return bcrypt.compare(password,hash);
    },
    async findUserByLoginOrEmail(loginOrEmail:string,password:string):Promise<boolean>{
        const findedUser=await usersRepository.findUserByLoginOrEmail(loginOrEmail);
        if(!findedUser){
            return false
        }

        return  this.checkPassword(password,findedUser.password);


    }
}