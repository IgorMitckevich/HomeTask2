import bcrypt from "bcrypt";
import {injectable} from "inversify";

@injectable()
export class BcryptService {
  async hashPassword(password: string): Promise<string> {
    const passwordSalt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, passwordSalt);
  }
  async checkPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}
