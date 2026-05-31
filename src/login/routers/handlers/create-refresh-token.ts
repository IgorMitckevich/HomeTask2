// import { Request, Response } from "express";
// import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
// import { refreshTokenService } from "../../../composition-root";
// import { jwtService } from "../../../composition-root";
// import {devicesCollection} from "../../../db/mongo.db";
//
// export const createRefreshToken = async (
//   request: Request,
//   response: Response,
// ) => {
//   try {
//     const oldRefreshToken = request.cookies.refreshToken;
//
//     if (!oldRefreshToken) {
//       return response.sendStatus(HttpStatus.Unauthorized);
//     }
//     const foundToken =
//       await refreshTokenService.findRefreshToken(oldRefreshToken);
//     if (!foundToken) {
//       return response.sendStatus(HttpStatus.Unauthorized);
//     }
//     const payload = await jwtService.verifyToken(oldRefreshToken);
//     if (!payload) {
//       return response.sendStatus(HttpStatus.Unauthorized);
//     }
//     const deviceSession = await devicesCollection.findOne({ deviceId: payload.deviceId });
//     if (!deviceSession) {
//       return response.sendStatus(HttpStatus.Unauthorized);
//     }
//     await refreshTokenService.deleteRefreshToken(oldRefreshToken);
//     const deviceId:string=payload.deviceId;
//     const newAccessToken = await jwtService.createAccessToken(payload.userId,deviceId);
//     const newRefreshToken = await jwtService.createRefreshToken(payload.userId,deviceId);
//
//
//     if (!newAccessToken || !newRefreshToken) {
//       return response.sendStatus(HttpStatus.Unauthorized);
//     }
//     await refreshTokenService.insertNewRefreshToken(newRefreshToken);
//
//     const findRefreshToken =
//       await refreshTokenService.findRefreshToken(newRefreshToken);
//     // if (!findRefreshToken) {
//     //   return response.sendStatus(HttpStatus.Unauthorized);
//     // }
//     await devicesCollection.updateOne(
//         { deviceId: deviceId },
//         {
//           $set: {
//             lastActiveDate: new Date().toISOString()
//           }
//         }
//     );
//
//     response.cookie("refreshToken", newRefreshToken, {
//       httpOnly: true,
//       secure: true,
//     });
//     response.status(HttpStatus.Ok).send({ accessToken: newAccessToken });
//   } catch (err) {
//     response.sendStatus(HttpStatus.InternalServerError);
//   }
// };
