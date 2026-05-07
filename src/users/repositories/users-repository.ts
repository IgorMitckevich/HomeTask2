import { UserViewModel } from "../types/UserViewModel";
import { usersCollection } from "../../db/mongo.db";
import { ObjectId, WithId } from "mongodb";
import { UserInputModel } from "../types/UserInputModel";
import {usersCollectionDB} from "../types/users-collection-DB";
import {usersWithEmailConfirmation} from "../types/user-with-EmailConfirmation";

export const usersRepository = {
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
        isConfirmed: true,
      }
    };


    const CreatedNewUser = await usersCollection.insertOne(newUserInputBD);

    return {
      id: newUserInputBD.id,
      _id: CreatedNewUser.insertedId,
      login: newUserInputBD.login,
      email: newUserInputBD.email,
      createdAt: newUserInputBD.createdAt,
    };
  },
  async deleteUser(userId: string): Promise<boolean> {
    const deleteUserById = await usersCollection.deleteOne({ id: userId });
    if (deleteUserById.deletedCount < 1) {
      return false;
    }
    return true;
  },
  async createUserWithConformationAreas(user:usersCollectionDB):Promise<usersWithEmailConfirmation> {

    const newUser=await usersCollection.insertOne({
      id:user.id,
      login:user.login,
      password:user.password,
      email:user.email,
      createdAt:user.createdAt,
      emailConfirmation:user.emailConfirmation
    })

    return {
      id: user.id,
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
      emailConfirmation:user.emailConfirmation
    }
  },
  async upadeUserConfirmation(userId:string):Promise<void> {

    await usersCollection.updateOne({id:userId}, {$set:{'emailConfirmation.isConfirmed':true}})

  },
  async repeatSendingConfirmationCode(id:string,confirmationCode:string):Promise<usersWithEmailConfirmation|null>{

    const updateUserCode=await usersCollection.updateOne({id:id}, {$set:{'emailConfirmation.confirmationCode':confirmationCode}})
    const findUser=await usersCollection.findOne({id})
    if(!findUser){
      return null;
    }
    return {
      id: findUser.id,
          login: findUser.login,
        email: findUser.email,
        createdAt: findUser.createdAt,
        emailConfirmation:findUser.emailConfirmation
    }


  }

};
