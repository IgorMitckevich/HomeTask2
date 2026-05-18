import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { jwtService } from "../../application/jwt-service";
import { expiredTokensCollection } from "../../../db/mongo.db";
import { refreshTokenService } from "../../application/refresh-token-service";

export const createLogout = async (request: Request, response: Response) => {
  const refreshToken = request.cookies.refreshToken;

  if (!refreshToken) {
    return response.sendStatus(HttpStatus.Unauthorized);
  }

  const isTokenBlackListed =
    await refreshTokenService.findRefreshToken(refreshToken);
  if (isTokenBlackListed) {
    return response.sendStatus(HttpStatus.Unauthorized);
  }
  const decodedToken = await jwtService.verifyToken(refreshToken);
  if (!decodedToken) {
    return response.sendStatus(HttpStatus.Unauthorized);
  }

  await refreshTokenService.addToBlackList(refreshToken);

  response.clearCookie("refreshToken", { httpOnly: true, secure: true });
  response.sendStatus(HttpStatus.NoContent);
};
