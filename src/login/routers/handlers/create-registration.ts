import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {UserInputModel} from "../../../users/types/UserInputModel";
import {usersService} from "../../../users/application/users-service";
import {Request,Response} from 'express';
import {queryUsersRepositories} from "../../../users/repositories/query-user-repositories";
import {nodemailerService} from "../../nodemaierService/sendEmail";
import {createErrorsMessages} from "../../../core/middlewares/validation/inputValidationBlogs";

export const createRegistration = async (req: Request<{},{},UserInputModel>, res: Response) => {
    try{

        const userSearchingByLogin=await queryUsersRepositories.getUserByLoginOrEmail(req.body.login,req.body.password)

        if(userSearchingByLogin?.login===req.body.login){
            console.log('fault by login')
            res.status(HttpStatus.BadRequest).send(createErrorsMessages([{field:"login",message:"not unique login"}]))
            return;
        }
        const userSearchingByEmail=await queryUsersRepositories.getUserByLoginOrEmail(req.body.email,req.body.password)
        if(userSearchingByEmail?.email===req.body.email){
            console.log('fault by email')
            res.status(HttpStatus.BadRequest).send(createErrorsMessages([{field:"email",message:"not unique email"}]))
            return;
        }


        const createRegistration=await usersService.createUserWithConfirmationAreas(req.body);

        try{

           await nodemailerService.sendEmail(
                createRegistration.email,
                createRegistration.emailConfirmation.confirmationCode as string )
            res.sendStatus(HttpStatus.NoContent)
        }
        catch(err){
            console.log('confirmation code not send')
        }


    }catch(err){
        res.sendStatus(HttpStatus.InternalServerError)
    }
}