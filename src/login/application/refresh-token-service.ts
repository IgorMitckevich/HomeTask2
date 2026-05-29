import { expiredTokensCollection } from "../../db/mongo.db";
import {ObjectId} from "mongodb";


export class refreshTokenList {
  // async addToBlackList(refreshToken: string) {
  //   await expiredTokensCollection.insertOne({ refreshToken, iat:(Date.now()/1000).toString(),exp:((Date.now()/1000)+20).toString(),deviceId:new ObjectId().toString() });
  // }

  async deleteRefreshToken(refreshToken: string) {
    await expiredTokensCollection.deleteOne({ refreshToken });
  }

  async findRefreshToken(refreshToken: string) {
    const result = await expiredTokensCollection.findOne({
      refreshToken: refreshToken,
    });
    return result;
  }
  async insertNewRefreshToken(refreshToken:string):Promise<void>{
    await expiredTokensCollection.insertOne({ refreshToken, iat:(Date.now()/1000).toString(),exp:((Date.now()/1000)+20).toString(),deviceId:new ObjectId().toString() })
  }
}
export const refreshTokenService = new refreshTokenList();
