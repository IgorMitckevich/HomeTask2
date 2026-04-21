import {UserViewModel} from "../types/UserViewModel";
import {usersRepository} from "../repositories/users-repository";
import { WithId} from "mongodb";
import {UserInputModel} from "../types/UserInputModel";
import {bcryptService} from "../../login/application/bcrypt-service";
import {queryUsersRepositories} from "../repositories/query-user-repositories";

export const usersService={
    async create(user:UserInputModel):Promise<WithId<UserViewModel>|null>{

        const CheckedEmail=await queryUsersRepositories.getUserByEmail(user.email);
        if(CheckedEmail){

            return null;
        }

        const passwordWithHash=await bcryptService.hashPassword(user.password);

        const newUser:UserInputModel={
                login:user.login,
            email:user.email,
            password:passwordWithHash
        }
        return usersRepository.create(newUser)
    },
    async deleteUser(userId:string):Promise<boolean>{

        return await usersRepository.deleteUser(userId)
    }
}