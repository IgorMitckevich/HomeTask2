import jwt from "jsonwebtoken";
import { appConfig } from "../../common/confit";

import { UserViewModel } from "../../users/types/UserViewModel";

export const jwtService = {
  async createUserPass(user: UserViewModel): Promise<string> {
    const payload = { userId: user.id };
    return jwt.sign(payload, appConfig.SecretKey, { expiresIn: "6h" });
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
};
