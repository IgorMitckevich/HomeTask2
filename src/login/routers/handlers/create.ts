import { Response, Request } from "express";
import { LoginInputModel } from "../../type/login-Input-model";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { jwtService } from "../../application/jwt-service";
import { queryUsersRepositories } from "../../../users/repositories/query-user-repositories";

export async function createLoginOrEmailAndPassword(
  req: Request<{}, {}, LoginInputModel>,
  res: Response,
): Promise<void> {
  try {
    const { loginOrEmail, password } = req.body;

    const checkAuthorized = await queryUsersRepositories.getUserByLoginOrEmail(
      loginOrEmail,
      password,
    );
    if (!checkAuthorized) {
      res.sendStatus(HttpStatus.Unauthorized);
      return;
    }
    const accessToken = await jwtService.createAccessToken(checkAuthorized.id);

    const refreshToken = await jwtService.createRefreshToken(
      checkAuthorized.id,
    );

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.status(HttpStatus.Ok).send({ accessToken: accessToken });
  } catch (err: unknown) {
    res.status(HttpStatus.InternalServerError).send(`errormessage:${err}`);
  }
}
