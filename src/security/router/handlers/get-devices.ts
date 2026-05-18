import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {queryDeviceRepositories} from "../../repositories/query-repositories";


export const getDevices=async (request:Request,response:Response)=>{

    try{
        const refreshToken=request.cookies.refresh_token;
        if(!refreshToken){
            return response.sendStatus(HttpStatus.Unauthorized);
        }
        const allDevices= await queryDeviceRepositories.getDevices();


        response.status(HttpStatus.Ok).send(allDevices)
    }catch(error){
        response.status(HttpStatus.InternalServerError).send(`Ошибка метода getDevices:${error}`);
    }
}