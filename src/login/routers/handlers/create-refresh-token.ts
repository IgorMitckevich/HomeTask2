import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { refreshTokenService } from "../../application/refresh-token-service";
import { jwtService } from "../../application/jwt-service";

export const createRefreshToken = async (
  request: Request,
  response: Response,
) => {
  try {
    const oldRefreshToken = request.cookies.refreshToken;

    if (!oldRefreshToken) {
      return response.sendStatus(HttpStatus.Unauthorized);
    }
    const isOldTokenBlackListed =
      await refreshTokenService.findRefreshToken(oldRefreshToken);
    if (isOldTokenBlackListed) {
      return response.sendStatus(HttpStatus.Unauthorized);
    }
    const payload = await jwtService.verifyToken(oldRefreshToken);
    if (!payload) {
      return response.sendStatus(HttpStatus.Unauthorized);
    }

    await refreshTokenService.addToBlackList(oldRefreshToken);

    const newAccessToken = await jwtService.createAccessToken(payload.userId);
    const newRefreshToken = await jwtService.createRefreshToken(payload.userId);

    if (!newAccessToken || !newRefreshToken) {
      return response.sendStatus(HttpStatus.Unauthorized);
    }

    const findRefreshToken =
      await refreshTokenService.findRefreshToken(newRefreshToken);
    if (findRefreshToken) {
      return response.sendStatus(HttpStatus.Unauthorized);
    }

    response.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
    });
    response.status(HttpStatus.Ok).send({ accessToken: newAccessToken });
  } catch (err) {
    response.sendStatus(HttpStatus.InternalServerError);
  }
};
