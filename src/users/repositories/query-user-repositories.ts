import { usersCollection } from "../../db/mongo.db";
import { WithId } from "mongodb";
import { UserViewModel } from "../types/UserViewModel";
import { PaginatorInput } from "../types/Paginator-input";
import { AuthMe } from "../../login/type/MeViewModel";
import { usersWithEmailConfirmation } from "../types/user-with-EmailConfirmation";
import {inject, injectable} from "inversify";
import {BcryptService} from "../../login/application/bcrypt-service";

@injectable()
export class QueryUsersRepositories {
  constructor(@inject(BcryptService) protected bcryptService: BcryptService) {}

  async getUsers(
    queryDto: PaginatorInput,
  ): Promise<{ items: WithId<UserViewModel>[]; totalCount: number }> {
    const {
      searchLoginTerm,
      searchEmailTerm,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
    } = queryDto;
    const skip = (pageNumber - 1) * pageSize;
    const searchConditions = [];
    if (searchLoginTerm) {
      searchConditions.push({
        login: { $regex: searchLoginTerm, $options: "i" },
      });
    }
    if (searchEmailTerm) {
      searchConditions.push({
        email: { $regex: searchEmailTerm, $options: "i" },
      });
    }
    const filter = searchConditions.length > 0 ? { $or: searchConditions } : {};
    const [items, totalCount] = await Promise.all([
      usersCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      usersCollection.countDocuments(filter),
    ]);

    return { items, totalCount };
  }
  async getUserByEmail(email: string): Promise<boolean> {
    const UserEmail = await usersCollection.findOne({ email: email });
    if (UserEmail) {
      return true;
    }
    return false;
  }
  async getUserByID(id: string): Promise<AuthMe | null> {
    const user = await usersCollection.findOne(
      { id: id },
      { projection: { password: 0 } },
    );
    if (!user) {
      return null;
    }

    return {
      email: user.email,
      login: user.login,
      userId: user.id,
    };
  }
  async getUserByLoginOrEmail(
    loginOrEmail: string,
    password: string,
  ): Promise<UserViewModel | null> {
    const user = await usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
    if (!user) {
      return null;
    }

    const checkPassword = await this.bcryptService.checkPassword(
      password,
      user.password,
    );
    if (!checkPassword) {
      return null;
    }

    return {
      id: user.id,
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
  async findUserByCode(code: string) {
    const user = await usersCollection.findOne({
      "emailConfirmation.confirmationCode": code,
    });

    return user;
  }
  async findByEmail(email: string) {
    const findUser = await usersCollection.findOne({ email: email });
    if (!findUser) {
      return null;
    }
    return {
      id: findUser.id,
      login: findUser.login,
      email: findUser.email,
      createdAt: findUser.createdAt,
      emailConfirmation: findUser.emailConfirmation,
      recovery:findUser.recovery
    };
  }
  async findUserByRecoveryCode(recoveryCode:string){
    return await usersCollection.findOne({
      "recovery.recoveryCode":recoveryCode
    })

  }
  async invalidateRecoveryCode(userId: string): Promise<void> {
    await usersCollection.updateOne(
        { id: userId },
        {
          $set: {
            "recovery.recoveryCode": null,
            "recovery.expirationDate": null
          }
        }
    );
  }

}
