import { UserViewModel } from "../types/UserViewModel";
import {UserModel} from "../../db/mongo.db";
import { ObjectId, WithId } from "mongodb";
import { UserInputModel } from "../types/UserInputModel";
import { UsersCollectionDB } from "../types/users-collection-d-b";
import { usersWithEmailConfirmation } from "../types/user-with-EmailConfirmation";
import {injectable} from "inversify";
import {randomUUID} from "node:crypto";
import {add} from "date-fns";

@injectable()
export class UsersRepository {
  async create(newUser: UserInputModel): Promise<WithId<UserViewModel> | null> {
    const newUserInputBD = {
      id: new ObjectId().toString(),
      login: newUser.login,
      password: newUser.password,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      emailConfirmation: {
        confirmationCode: null,
        expirationDate: null,
        isConfirmed: false,
      },recovery:{
        recoveryCode: null,
        expirationDate: null
      }
    };

    const CreatedNewUser = await UserModel.insertMany(newUserInputBD);

    return {
      id: newUserInputBD.id,
      _id: CreatedNewUser[0]._id,
      login: newUserInputBD.login,
      email: newUserInputBD.email,
      createdAt: newUserInputBD.createdAt,
    };
  }
  async deleteUser(userId: string): Promise<boolean> {
    const deleteUserById = await UserModel.deleteOne({ id: userId });
    if (deleteUserById.deletedCount < 1) {
      return false;
    }
    return true;
  }
  async createUserWithConformationAreas(
    user: UsersCollectionDB,
  ): Promise<usersWithEmailConfirmation> {
    const newUser = await UserModel.insertMany({
      id: user.id,
      login: user.login,
      password: user.password,
      email: user.email,
      createdAt: user.createdAt,
      emailConfirmation: user.emailConfirmation,
      recovery:user.recovery|| {
        recoveryCode: null,
        expirationDate: null}
    });

    return {
      id: user.id,
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
      emailConfirmation: user.emailConfirmation,
    };
  }
  async updateUserConfirmation(userId: string): Promise<void> {
    await UserModel.updateOne(
      { id: userId },
      { $set: { "emailConfirmation.isConfirmed": true } },
    );
  }
  async repeatSendingConfirmationCode(
    id: string,
    confirmationCode: string,
  ){
    const updateUserCode = await UserModel.updateOne(
      { id: id },
      { $set: { "emailConfirmation.confirmationCode": confirmationCode } },
    );
    const findUser = await UserModel.findOne({ id }).lean();
    if (!findUser) {
      return null;
    }
    return {
      id: findUser.id,
      login: findUser.login,
      email: findUser.email,
      createdAt: findUser.createdAt,
      emailConfirmation: findUser.emailConfirmation,
      recovery: findUser.recovery|| {
        recoveryCode: null,
        expirationDate: null}
    };
  }
  async updateUserPassword(userId:string, newPassword:string):Promise<void>{
    await UserModel.updateOne(
    {id: userId},
    {$set:{password:newPassword,
      "recovery.recoveryCode": null,
      "recovery.expirationDate": null}
    }
    )
  }
  async updateRecoveryCode(userId:string,recoveryCode:string,expirationDate:Date):Promise<void>{

     await UserModel.updateOne(
        {id: userId},
        {$set:{"recovery.recoveryCode":recoveryCode,
            "recovery.expirationDate":expirationDate},}
    )

  }

}
