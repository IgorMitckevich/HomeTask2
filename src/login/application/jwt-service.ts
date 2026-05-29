import jwt from "jsonwebtoken";
import { appConfig } from "../../common/config";
import {ObjectId} from "mongodb";
import {TokenType} from "../../security/types/token-type";

export const jwtService = {
  async createAccessToken(id: string,deviceId:string): Promise<string> {
    // const payload = { userId: id };
    const payload = { userId: id ,deviceId:deviceId };
    return jwt.sign(payload, appConfig.SecretKey, { expiresIn: 10 });
  },
  async verifyToken(token: string): Promise<TokenType | null> {
    try {

      return jwt.verify(token, appConfig.SecretKey)   as unknown as TokenType | null;

    } catch (err: unknown) {
      return null;
    }
  },
  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const decoded = jwt.verify(token, appConfig.SecretKey);
      return false;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return true;
      }
      return true;
    }
  },
  async decodeToken(token: string): Promise<{ userId: string } | null> {
    try {
      const decoded = jwt.decode(token) as { userId: string };

      return decoded;
    } catch (err) {
      return null;
    }
  },
  async createRefreshToken(id: string,deviceId:string):Promise<string> {
    const payload = { userId: id ,deviceId:deviceId  };
    return jwt.sign(payload, appConfig.SecretKey, { expiresIn: 20 });
  },
};
