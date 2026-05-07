import { UserViewModel } from "../types/UserViewModel";
import { usersRepository } from "../repositories/users-repository";
import {ObjectId, WithId} from "mongodb";
import { UserInputModel } from "../types/UserInputModel";
import { bcryptService } from "../../login/application/bcrypt-service";
import { queryUsersRepositories } from "../repositories/query-user-repositories";
import {usersCollectionDB} from "../types/users-collection-DB";
import {randomUUID} from "node:crypto";
import {add} from "date-fns";
import {usersWithEmailConfirmation} from "../types/user-with-EmailConfirmation";


 export class usersApplication {
  async create(userDto: UserInputModel): Promise<WithId<UserViewModel> | null> {
    const user = await queryUsersRepositories.getUserByEmail(
      userDto.email,
    );
    if (user) {
      return null;
    }

    const passwordWithHash = await bcryptService.hashPassword(userDto.password);

    const newUser: UserInputModel = {
      login: userDto.login,
      email: userDto.email,
      password: passwordWithHash,
    };
    return usersRepository.create(newUser);
  }
  async deleteUser(userId: string): Promise<boolean> {
    return await usersRepository.deleteUser(userId);
  }
  async createUserWithConfirmationAreas(userDto:UserInputModel):Promise<usersWithEmailConfirmation>{

    const hashPassword = await bcryptService.hashPassword(userDto.password);
    const newUser:usersCollectionDB={
      id: new ObjectId().toString(),
      login: userDto.login,
      email: userDto.email,
      createdAt: new Date().toISOString(),
      password: hashPassword,
      emailConfirmation:{
        confirmationCode:randomUUID(),
        expirationDate:add(new Date(),{
          hours:2,
          minutes:0
        }),
        isConfirmed:false}
    }
    return await usersRepository.createUserWithConformationAreas(newUser);
  }
  async updateUserConfirmation(userId:string):Promise<void> {

    return await usersRepository.upadeUserConfirmation(userId);
  }
  async repeatSendingEmailConfirmationCode(id:string,confirmationCode:string){

    await usersRepository.repeatSendingConfirmationCode(id,confirmationCode);
  }
}

export const usersService=new usersApplication();
