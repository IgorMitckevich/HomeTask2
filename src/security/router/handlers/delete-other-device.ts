import{Request,Response} from 'express'
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {jwtService} from "../../../composition-root";
import {sessionDeviceService} from "../../../composition-root";


export const deleteOtherDevice=async (request:Request,response:Response)=>{

   try{
       const refreshToken=request.cookies.refreshToken;
       if(!refreshToken){
           return response.sendStatus(HttpStatus.Unauthorized);
       }
       const payload=await jwtService.verifyToken(refreshToken);
       if(!payload){
           return response.sendStatus(HttpStatus.Unauthorized);
       }

       await sessionDeviceService.deleteAllSessionDevices(payload.deviceId)

       response.sendStatus(HttpStatus.NoContent)
   }
   catch(err){
       console.log(`Error in deleteOtherDevice:${err}`);
       response.status(HttpStatus.InternalServerError).send(`Catch:${err}`)
   }

}


