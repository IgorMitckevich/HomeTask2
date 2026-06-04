import { UserViewModel } from "../types/UserViewModel";
import { ObjectId, WithId } from "mongodb";
import { UserInputModel } from "../types/UserInputModel";
import { UsersCollectionDB } from "../types/users-collection-d-b";
import { randomUUID } from "node:crypto";
import { add } from "date-fns";
import { usersWithEmailConfirmation } from "../types/user-with-EmailConfirmation";
import {inject, injectable} from "inversify";
import {UsersRepository} from "../repositories/users-repository";
import {BcryptService} from "../../login/application/bcrypt-service";
import {QueryUsersRepositories} from "../repositories/query-user-repositories";

@injectable()
export class UsersService {
  constructor(@inject(UsersRepository) protected usersRepository: UsersRepository,
              @inject(QueryUsersRepositories) protected queryUsersRepositories: QueryUsersRepositories,
              @inject(BcryptService) protected bcryptService: BcryptService) {

  }

  async create(userDto: UserInputModel): Promise<WithId<UserViewModel> | null> {
    const user = await this.queryUsersRepositories.getUserByEmail(userDto.email);
    if (user) {
      return null;
    }

    const passwordWithHash = await this.bcryptService.hashPassword(userDto.password);

    const newUser: UserInputModel = {
      login: userDto.login,
      email: userDto.email,
      password: passwordWithHash,

    };
    return this.usersRepository.create(newUser);
  }
  async deleteUser(userId: string): Promise<boolean> {
    return await this.usersRepository.deleteUser(userId);
  }
  async createUserWithConfirmationAreas(
    userDto: UserInputModel,
  ): Promise<usersWithEmailConfirmation> {
    const hashPassword = await this.bcryptService.hashPassword(userDto.password);
    const newUser: UsersCollectionDB = {
      id: new ObjectId().toString(),
      login: userDto.login,
      email: userDto.email,
      createdAt: new Date().toISOString(),
      password: hashPassword,
      emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
          hours: 2,
          minutes: 0,
        }),
        isConfirmed: false,
      },recovery:{
        recoveryCode: null,
        expirationDate: null
      }
    };
    return await this.usersRepository.createUserWithConformationAreas(newUser);
  }
  async updateUserConfirmation(userId: string): Promise<void> {
    return await this.usersRepository.updateUserConfirmation(userId);
  }
  async repeatSendingEmailConfirmationCode(
    id: string,
    confirmationCode: string,
  ) {
    await this.usersRepository.repeatSendingConfirmationCode(id, confirmationCode);
  }
  async updateUserPassword(userId:string, newPassword:string):Promise<void>{

    const hashPassword = await this.bcryptService.hashPassword(newPassword);
     await this.usersRepository.updateUserPassword(userId,hashPassword);

  }
  async updateRecoveryCode(userId:string,recoveryCode:string):Promise<void>{
    const expirationDate:Date= add(new Date(), {hours: 2, minutes: 0,});

    await this.usersRepository.updateRecoveryCode(userId,recoveryCode,expirationDate);

  }

}


