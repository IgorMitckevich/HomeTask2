import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {queryDeviceRepositories} from "../../../common/composition-root";
import {jwtService} from "../../../common/composition-root";


export const getDevices=async (request:Request,response:Response)=>{

    try{
        const refreshToken=request.cookies.refreshToken;
        if(!refreshToken){
            return response.sendStatus(HttpStatus.Unauthorized);
        }
        const payload=await jwtService.verifyToken(refreshToken);
        if(!payload || !payload.userId){
            return response.sendStatus(HttpStatus.Unauthorized);
        }

        const userDevices = await queryDeviceRepositories.getDevices(payload.userId);


        response.status(HttpStatus.Ok).send(userDevices )
    }catch(error){
        response.status(HttpStatus.InternalServerError).send(`Ошибка метода getDevices:${error}`);
    }
}