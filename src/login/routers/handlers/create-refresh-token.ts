import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";

export const createRefreshToken = async (request:Request,response:Response) => {

    const cookie_name=request.cookies.cookie_name

    let value;
    let accessToken;
    response.cookie('cookie_name',value,{httpOnly:true,secure:true})
    response.status(HttpStatus.NoContent).send({accessToken:accessToken})

}