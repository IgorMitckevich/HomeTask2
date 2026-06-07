import { ExpiredCollectionModel } from "../../db/mongo.db";
import {ObjectId} from "mongodb";
import {injectable} from "inversify";

@injectable()
export class RefreshTokenService {
  async deleteRefreshToken(refreshToken: string) {
    await ExpiredCollectionModel.deleteOne({ refreshToken });
  }

  async findRefreshToken(refreshToken: string) {
    const result = await ExpiredCollectionModel.findOne({
      refreshToken: refreshToken,
    }).lean();
    return result;
  }
  async insertNewRefreshToken(refreshToken:string):Promise<void>{
    await ExpiredCollectionModel.insertMany({ refreshToken, iat:(Date.now()/1000).toString(),exp:((Date.now()/1000)+20).toString(),deviceId:new ObjectId().toString() })
  }
}
