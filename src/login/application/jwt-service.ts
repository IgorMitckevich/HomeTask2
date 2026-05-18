import jwt from "jsonwebtoken";
import { appConfig } from "../../common/confit";

import { UserViewModel } from "../../users/types/UserViewModel";

export const jwtService = {
  async createAccessToken(id: string): Promise<string> {
    const payload = { userId: id };
    return jwt.sign(payload, appConfig.SecretKey, { expiresIn: "10s" });
  },
  async verifyToken(token: string): Promise<{ userId: string } | null> {
    try {
      return jwt.verify(token, appConfig.SecretKey) as {
        userId: string;
      } | null;
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
  async createRefreshToken(id: string): Promise<string> {
    const payload = { userId: id };
    return jwt.sign(payload, appConfig.SecretKey, { expiresIn: "20s" });
  },
};
