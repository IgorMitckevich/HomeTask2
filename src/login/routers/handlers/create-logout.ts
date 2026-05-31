// import { Request, Response } from "express";
// import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
// import { jwtService } from "../../../composition-root";
// import {devicesCollection} from "../../../db/mongo.db";
// import { refreshTokenService } from "../../../composition-root";
//
// export const createLogout = async (request: Request, response: Response) => {
//   const refreshToken = request.cookies.refreshToken;
//
//   if (!refreshToken) {
//     return response.sendStatus(HttpStatus.Unauthorized);
//   }
//
//   const foundRefreshToken =
//     await refreshTokenService.findRefreshToken(refreshToken);
//   if (!foundRefreshToken) {
//     return response.sendStatus(HttpStatus.Unauthorized);
//   }
//   const decodedToken = await jwtService.verifyToken(refreshToken);
//   if (!decodedToken) {
//     return response.sendStatus(HttpStatus.Unauthorized);
//   }
//   const deviceSession = await devicesCollection.findOne({ deviceId: decodedToken.deviceId });
//   if (!deviceSession) {
//     return response.sendStatus(HttpStatus.Unauthorized);
//   }
//   // await refreshTokenService.addToBlackList(refreshToken);
//   await refreshTokenService.deleteRefreshToken(refreshToken);
//
//   await devicesCollection.deleteOne({deviceId: decodedToken.deviceId});
//
//   response.clearCookie("refreshToken", { httpOnly: true, secure: true });
//   response.sendStatus(HttpStatus.NoContent);
// };
