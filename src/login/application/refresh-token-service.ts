import { expiredTokensCollection } from "../../db/mongo.db";

export class refreshTokenList {
  async addToBlackList(refreshToken: string) {
    await expiredTokensCollection.insertOne({ refreshToken });
  }

  async findRefreshToken(refreshToken: string) {
    const result = await expiredTokensCollection.findOne({
      refreshToken: refreshToken,
    });
    return result;
  }
}
export const refreshTokenService = new refreshTokenList();
