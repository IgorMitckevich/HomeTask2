import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../core/https-statuses/httpStatuses";
import {jwtService} from "../application/jwt-service";
import {IdType} from "../../common/id-type";


export const accessTokenGuard = async (req: Request, res: Response, next: NextFunction) => {

    const authorization = req.headers.authorization;
    if (!authorization) {
        res.sendStatus(HttpStatus.Unauthorized);
        return;
    }
    const [authType, token] = authorization.split(" ");

    if(authType!== 'Bearer'){
        return res.sendStatus(HttpStatus.Unauthorized);
    }

    const payload= await jwtService.verifyToken(token);
    if (payload) {
        const {userId}= payload;
        req.user = {id:userId} as IdType;

        next()
        return
    }

    res.sendStatus(HttpStatus.Unauthorized);

    return
}



