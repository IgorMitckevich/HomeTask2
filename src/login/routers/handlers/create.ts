// import { Response, Request } from "express";
// import { LoginInputModel } from "../../type/login-Input-model";
// import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
// import { jwtService } from "../../../composition-root";
// import { queryUsersRepositories } from "../../../composition-root";
// import {devicesCollection} from "../../../db/mongo.db";
// import {ObjectId} from "mongodb";
// import {refreshTokenService} from "../../../composition-root";

// export async function createLoginOrEmailAndPassword(
//   req: Request<{}, {}, LoginInputModel>,
//   res: Response,
// ): Promise<void> {
//   try {
//     const { loginOrEmail, password } = req.body;
//
//     const checkAuthorized = await queryUsersRepositories.getUserByLoginOrEmail(
//       loginOrEmail,
//       password,
//     );
//     if (!checkAuthorized) {
//       res.sendStatus(HttpStatus.Unauthorized);
//       return;
//     }
//     const deviceId:string=new ObjectId().toString();
//     const accessToken = await jwtService.createAccessToken(checkAuthorized.id,deviceId);
//
//     const refreshToken = await jwtService.createRefreshToken(
//       checkAuthorized.id,deviceId
//     );
//     await refreshTokenService.insertNewRefreshToken(refreshToken);
//       await devicesCollection.insertOne({
//         userId:checkAuthorized.id,
//         deviceId:deviceId,
//         ip:req.ip||'unknown',
//         title:req.headers['user-agent']||'unknown',
//         lastActiveDate:new Date().toISOString(),
//       })
//     res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
//     res.status(HttpStatus.Ok).send({ accessToken: accessToken });
//   } catch (err: unknown) {
//     res.status(HttpStatus.InternalServerError).send(`errormessage:${err}`);
//   }
// }
