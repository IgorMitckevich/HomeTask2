import {Request, Response} from 'express';
import {RegistrationConfirmationCodeModel} from "../../type/Registration-confirmation-codeModel";
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {nodemailerService} from "../../nodemaierService/sendEmail";
import {createErrorsMessages} from "../../../core/middlewares/validation/inputValidationBlogs";

export  const createRegistrationConfirmation = async (req: Request<{},{},RegistrationConfirmationCodeModel>, res: Response) => {
    try{
        const code=req.body.code;
        const registrationConfirmWithCode=await nodemailerService.confirmEmail(code)
        if(!registrationConfirmWithCode){
            res.status(HttpStatus.BadRequest).send(createErrorsMessages([{field:"code",message:"incorrect value"}]));
            return;
        }

        res.sendStatus(HttpStatus.NoContent)
    }
    catch(err){
        res.sendStatus(HttpStatus.InternalServerError);
    }
}