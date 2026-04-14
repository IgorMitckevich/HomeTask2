import {Response,Request} from 'express'
import {LoginInputModel} from "../../type/login-Input-model";
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {usersService} from "../../../users/application/users-service";


export async function createLoginOrEmailAndPassword(req:Request<{},{},LoginInputModel>,res:Response):Promise<void>{


    try{

        const {loginOrEmail,password}=req.body;

        const accessToken=await usersService.findUserByLoginOrEmail(loginOrEmail,password)
        if(!accessToken){

             res.sendStatus(HttpStatus.Unauthorized)
            return
        }
        res.sendStatus(HttpStatus.NoContent)
    }
    catch(err){

        res.status(HttpStatus.InternalServerError).send(`${err}`)
    }

}