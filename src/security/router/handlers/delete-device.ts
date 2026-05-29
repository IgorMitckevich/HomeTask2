import{Request,Response} from 'express'
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {jwtService} from "../../../login/application/jwt-service";
import {sessionDeviceService} from "../../application/session-device-service";
import {expiredTokensCollection} from "../../../db/mongo.db";


 export const deleteDevice=async (request:Request,response:Response)=>{
    try{
        const refreshToken=request.cookies.refreshToken;
        const deviceId  =request.params.deviceId as string;
        const findDevice=await sessionDeviceService.findDevice(deviceId);
        if(!findDevice){
            return response.sendStatus(HttpStatus.NotFound);
        }
        if(!refreshToken){
            return response.sendStatus(HttpStatus.Unauthorized);
        }
        const payload=await jwtService.verifyToken(refreshToken);
        if(!payload){
            return response.sendStatus(HttpStatus.Unauthorized);
        }

        if(payload.userId!==findDevice.userId){
            return response.sendStatus(HttpStatus.Forbidden)
        }

        await sessionDeviceService.deleteSessionDevice(deviceId)
        await expiredTokensCollection.deleteOne({deviceId})
        response.sendStatus(HttpStatus.NoContent)
    }
    catch(error){
        console.log(`Error in deleteDevice:${error}`);
        response.status(HttpStatus.InternalServerError).send(`Catch :${error}`)
    }

}