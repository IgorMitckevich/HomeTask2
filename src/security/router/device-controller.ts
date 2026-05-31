import {DevicesService} from "../application/session-device-service";
import {injectable,inject} from "inversify";
import { QueryDevicesRepositories} from "../repositories/query-devices-repositories";
import {Request, Response} from "express";
import {HttpStatus} from "../../core/https-statuses/httpStatuses";
import {expiredTokensCollection} from "../../db/mongo.db";
import {JwtService} from "../../login/application/jwt-service";

@injectable()
export class DeviceController {
    constructor(@inject(DevicesService) protected deviceService:DevicesService,
                @inject(QueryDevicesRepositories) protected queryDevicesRepositories:QueryDevicesRepositories,
                @inject(JwtService) protected jwtService:JwtService){

    }
    async deleteDevice(request:Request,response:Response){
        try{
            const refreshToken=request.cookies.refreshToken;
            const deviceId  =request.params.deviceId as string;
            const findDevice=await this.deviceService.findDevice(deviceId);
            if(!findDevice){
                return response.sendStatus(HttpStatus.NotFound);
            }
            if(!refreshToken){
                return response.sendStatus(HttpStatus.Unauthorized);
            }
            const payload=await this.jwtService.verifyToken(refreshToken);
            if(!payload){
                return response.sendStatus(HttpStatus.Unauthorized);
            }

            if(payload.userId!==findDevice.userId){
                return response.sendStatus(HttpStatus.Forbidden)
            }

            await this.deviceService.deleteSessionDevice(deviceId)
            await expiredTokensCollection.deleteOne({deviceId})
            response.sendStatus(HttpStatus.NoContent)
        }
        catch(error){
            console.log(`Error in deleteDevice:${error}`);
            response.status(HttpStatus.InternalServerError).send(`Catch :${error}`)
        }

    }

    async deleteOtherDevice (request:Request,response:Response){

        try{
            const refreshToken=request.cookies.refreshToken;
            if(!refreshToken){
                return response.sendStatus(HttpStatus.Unauthorized);
            }
            const payload=await this.jwtService.verifyToken(refreshToken);
            if(!payload){
                return response.sendStatus(HttpStatus.Unauthorized);
            }

            await this.deviceService.deleteAllSessionDevices(payload.deviceId)

            response.sendStatus(HttpStatus.NoContent)
        }
        catch(err){
            console.log(`Error in deleteOtherDevice:${err}`);
            response.status(HttpStatus.InternalServerError).send(`Catch:${err}`)
        }

    }

    async getDevices (request:Request,response:Response){

        try{
            const refreshToken=request.cookies.refreshToken;
            if(!refreshToken){
                return response.sendStatus(HttpStatus.Unauthorized);
            }
            const payload=await this.jwtService.verifyToken(refreshToken);
            if(!payload || !payload.userId){
                return response.sendStatus(HttpStatus.Unauthorized);
            }

            const userDevices = await this.queryDevicesRepositories.getDevices(payload.userId);


            response.status(HttpStatus.Ok).send(userDevices )
        }catch(error){
            response.status(HttpStatus.InternalServerError).send(`Ошибка метода getDevices:${error}`);
        }
    }

}