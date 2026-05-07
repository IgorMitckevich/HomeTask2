import{Request,Response} from 'express'
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {accessTokenGuard} from "../../middlewares/authorization";

export const createLogout = async (request:Request,response:Response) => {

    const cookie_name=request.cookies.cookie_name

    let value;

    response.cookie('cookie_name',value,{httpOnly:true,secure:true})
    response.sendStatus(HttpStatus.Ok)
}