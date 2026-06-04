import {NextFunction, Request, Response} from "express";
import {LoginInputModel} from "../type/login-Input-model";
import {HttpStatus} from "../../core/https-statuses/httpStatuses";
import {ObjectId} from "mongodb";
import {devicesCollection} from "../../db/mongo.db";
import {PasswordRecoveryInputModel} from "../type/Password-Recovery-Input-Model";
import {UserInputModel} from "../../users/types/UserInputModel";
import {createErrorsMessages} from "../../core/middlewares/validation/inputValidationBlogs";
import {RegistrationConfirmationCodeModel} from "../type/Registration-confirmation-codeModel";
import {RegistrationEmailResending} from "../type/Registration-Email-Resending";
import {randomUUID} from "node:crypto";
import {AuthMe} from "../type/MeViewModel";
import {inject, injectable} from "inversify";
import {RefreshTokenService} from "../application/refresh-token-service";
import {BcryptService} from "../application/bcrypt-service";
import {JwtService} from "../application/jwt-service";
import {NodemailerService} from "../nodemaierService/sendEmail";
import {QueryUsersRepositories} from "../../users/repositories/query-user-repositories";
import {UsersService} from "../../users/application/users-service";
import {IdType} from "../../common/id-type";
import {NewPasswordRecoveryInput} from "../type/New-Password-Recovery-Input-Model";
import {usersCollection} from "../../db/mongo.db";

@injectable()
export class Authentication{
    constructor(@inject(RefreshTokenService) protected refreshTokenService: RefreshTokenService,
                @inject(QueryUsersRepositories) protected queryUsersRepositories: QueryUsersRepositories,
                @inject(UsersService) protected usersService: UsersService,
                @inject(BcryptService) protected bcryptService: BcryptService,
                @inject(JwtService) protected jwtService: JwtService,
                @inject(NodemailerService) protected nodemailerService:NodemailerService) {

    }
    async  createLoginOrEmailAndPassword(
        req: Request<{}, {}, LoginInputModel>,
        res: Response,
    ): Promise<void> {
        try {
            const { loginOrEmail, password } = req.body;

            const checkAuthorized = await this.queryUsersRepositories.getUserByLoginOrEmail(
                loginOrEmail,
                password,
            );
            if (!checkAuthorized) {
                res.sendStatus(HttpStatus.Unauthorized);
                return;
            }
            const deviceId:string=new ObjectId().toString();
            const accessToken = await this.jwtService.createAccessToken(checkAuthorized.id,deviceId);

            const refreshToken = await this.jwtService.createRefreshToken(
                checkAuthorized.id,deviceId
            );
            await this.refreshTokenService.insertNewRefreshToken(refreshToken);
            await devicesCollection.insertOne({
                userId:checkAuthorized.id,
                deviceId:deviceId,
                ip:req.ip||'unknown',
                title:req.headers['user-agent']||'unknown',
                lastActiveDate:new Date().toISOString(),
            })
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
            res.status(HttpStatus.Ok).send({ accessToken: accessToken });
        } catch (err: unknown) {
            res.status(HttpStatus.InternalServerError).send(`errormessage:${err}`);
        }
    }
    async createLogout  (request: Request, response: Response)  {
        const refreshToken = request.cookies.refreshToken;

        if (!refreshToken) {
            return response.sendStatus(HttpStatus.Unauthorized);
        }

        const foundRefreshToken =
            await this.refreshTokenService.findRefreshToken(refreshToken);
        if (!foundRefreshToken) {
            return response.sendStatus(HttpStatus.Unauthorized);
        }
        const decodedToken = await this.jwtService.verifyToken(refreshToken);
        if (!decodedToken) {
            return response.sendStatus(HttpStatus.Unauthorized);
        }
        const deviceSession = await devicesCollection.findOne({ deviceId: decodedToken.deviceId });
        if (!deviceSession) {
            return response.sendStatus(HttpStatus.Unauthorized);
        }

        await this.refreshTokenService.deleteRefreshToken(refreshToken);

        await devicesCollection.deleteOne({deviceId: decodedToken.deviceId});

        response.clearCookie("refreshToken", { httpOnly: true, secure: true });
        response.sendStatus(HttpStatus.NoContent);
    }
    async createPasswordRecovery (req: Request<{},{},PasswordRecoveryInputModel>, res: Response):Promise<void>  {
        try{
            const userEmail=req.body.email;
            const user=await this.queryUsersRepositories.findByEmail(userEmail);
            if(!user){
                 res.sendStatus(HttpStatus.NoContent);
                 return;
            }
            const recoveryCode=randomUUID();
            await this.usersService.updateRecoveryCode(user.id,recoveryCode);
            await this.nodemailerService.sendRecoveryCodeOnEmail(
                user.email,
                recoveryCode)

            res.sendStatus(HttpStatus.NoContent);
        }
        catch(err){
            res.status(HttpStatus.InternalServerError).send(`password-recovery fault: ${err}`);
        }
    }

    async createNewPassword(req:Request<{},{},NewPasswordRecoveryInput>,res:Response){
        try{
            const {newPassword,recoveryCode}=req.body;


            const user=await this.queryUsersRepositories.findUserByRecoveryCode(recoveryCode);
            if(!user){
                return res.status(HttpStatus.BadRequest).send(
                    createErrorsMessages([{ field: "recoveryCode", message: "invalid recovery code" }])
                );
            }

            if(!user.recovery.expirationDate||
                user.recovery.expirationDate  < new Date())  {
                res.status(HttpStatus.BadRequest).send(createErrorsMessages([{ field: "recoveryCode", message: "invalid recovery code" }]));
                return;
            }
            const isSamePassword = await this.bcryptService.checkPassword(newPassword, user.password);
            if (isSamePassword) {
                res.status(HttpStatus.BadRequest).send(
                    createErrorsMessages([{ field: "newPassword", message: "password must be different" }])
                );
                return;
            }


            await this.usersService.updateUserPassword(user.id,newPassword)





            res.sendStatus(HttpStatus.NoContent);
        } catch(err) {
            console.error('Create new password error:', err);
            res.status(HttpStatus.InternalServerError).json({ error: "Internal server error" });
        }
    }




    async createRefreshToken(
        request: Request,
        response: Response,
    ) {
        try {
            const oldRefreshToken = request.cookies.refreshToken;

            if (!oldRefreshToken) {
                return response.sendStatus(HttpStatus.Unauthorized);
            }
            const foundToken =
                await this.refreshTokenService.findRefreshToken(oldRefreshToken);
            if (!foundToken) {
                return response.sendStatus(HttpStatus.Unauthorized);
            }
            const payload = await this.jwtService.verifyToken(oldRefreshToken);
            if (!payload) {
                return response.sendStatus(HttpStatus.Unauthorized);
            }
            const deviceSession = await devicesCollection.findOne({ deviceId: payload.deviceId });
            if (!deviceSession) {
                return response.sendStatus(HttpStatus.Unauthorized);
            }
            await this.refreshTokenService.deleteRefreshToken(oldRefreshToken);
            const deviceId:string=payload.deviceId;
            const newAccessToken = await this.jwtService.createAccessToken(payload.userId,deviceId);
            const newRefreshToken = await this.jwtService.createRefreshToken(payload.userId,deviceId);


            if (!newAccessToken || !newRefreshToken) {
                return response.sendStatus(HttpStatus.Unauthorized);
            }
            await this.refreshTokenService.insertNewRefreshToken(newRefreshToken);

            const findRefreshToken =
                await this.refreshTokenService.findRefreshToken(newRefreshToken);

            await devicesCollection.updateOne(
                { deviceId: deviceId },
                {
                    $set: {
                        lastActiveDate: new Date().toISOString()
                    }
                }
            );

            response.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: true,
            });
            response.status(HttpStatus.Ok).send({ accessToken: newAccessToken });
        } catch (err) {
            response.sendStatus(HttpStatus.InternalServerError);
        }
    }

    async createRegistration  (
        req: Request<{}, {}, UserInputModel>,
        res: Response,
    ) {
        try {
            const userSearchingByLogin =
                await this.queryUsersRepositories.getUserByLoginOrEmail(
                    req.body.login,
                    req.body.password,
                );

            if (userSearchingByLogin?.login === req.body.login) {
                console.log("fault by login");
                res
                    .status(HttpStatus.BadRequest)
                    .send(
                        createErrorsMessages([
                            { field: "login", message: "not unique login" },
                        ]),
                    );
                return;
            }
            const userSearchingByEmail =
                await this.queryUsersRepositories.getUserByLoginOrEmail(
                    req.body.email,
                    req.body.password,
                );
            if (userSearchingByEmail?.email === req.body.email) {
                console.log("fault by email");
                res
                    .status(HttpStatus.BadRequest)
                    .send(
                        createErrorsMessages([
                            { field: "email", message: "not unique email" },
                        ]),
                    );
                return;
            }

            const createRegistration =
                await this.usersService.createUserWithConfirmationAreas(req.body);

            try {
                this.nodemailerService.sendEmail(
                    createRegistration.email,
                    createRegistration.emailConfirmation.confirmationCode as string,
                );
                res.sendStatus(HttpStatus.NoContent);
            } catch (err) {
                console.log("confirmation code not send");
            }
        } catch (err) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }

    async createRegistrationConfirmation (
        req: Request<{}, {}, RegistrationConfirmationCodeModel>,
        res: Response,
    )  {
        try {
            const code = req.body.code;
            const registrationConfirmWithCode =
                await this.nodemailerService.confirmEmail(code);
            if (!registrationConfirmWithCode) {
                res
                    .status(HttpStatus.BadRequest)
                    .send(
                        createErrorsMessages([{ field: "code", message: "incorrect value" }]),
                    );
                return;
            }

            res.sendStatus(HttpStatus.NoContent);
        } catch (err) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }

    async createRegistrationEmailResendingRequest  (
        req: Request<{}, {}, RegistrationEmailResending>,
        res: Response,
    ) {
        try {
            const inputEmail = req.body.email;
            const findUser = await this.queryUsersRepositories.findByEmail(inputEmail);
            if (!findUser) {
                res
                    .status(HttpStatus.BadRequest)
                    .send(
                        createErrorsMessages([
                            { field: "email", message: "email not exists" },
                        ]),
                    );
                return;
            }
            if (findUser.emailConfirmation.isConfirmed) {
                res
                    .status(HttpStatus.BadRequest)
                    .send(
                        createErrorsMessages([
                            { field: "email", message: "email is already confirmed" },
                        ]),
                    );
                return;
            }

            const newCode = randomUUID();
            const userWithNewCode =
                await this.usersService.repeatSendingEmailConfirmationCode(
                    findUser.id,
                    newCode,
                );

            try {
                this.nodemailerService.sendEmail(inputEmail, newCode);
                res.sendStatus(HttpStatus.NoContent);
            } catch (err) {
                console.log("error with sending email");
                res.sendStatus(HttpStatus.InternalServerError);
            }
        } catch (err) {
            res.sendStatus(HttpStatus.InternalServerError);
        }
    }

    async accessTokenGuard  (
        req: Request,
        res: Response,
        next: NextFunction,
    )  {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.sendStatus(HttpStatus.Unauthorized);
            return;
        }
        const [authType, token] = authorization.split(" ");

        if (authType !== "Bearer") {
            return res.sendStatus(HttpStatus.Unauthorized);
        }

        const payload = await this.jwtService.verifyToken(token);
        if (payload) {
            const { userId } = payload;
            req.user = { id: userId } as IdType;

            next();
            return;
        }

        res.sendStatus(HttpStatus.Unauthorized);

        return;
    }


    async  getMe(req: Request, res: Response): Promise<any> {
        try {
            const userId = req.user.id;
            const Me: AuthMe | null = await this.queryUsersRepositories.getUserByID(userId);
            if (!Me) {
                res.sendStatus(HttpStatus.Unauthorized);
                return;
            }

            res.status(HttpStatus.Ok).send(Me);
        } catch (err) {
            res.status(HttpStatus.InternalServerError).send({ err });
        }
    }
}