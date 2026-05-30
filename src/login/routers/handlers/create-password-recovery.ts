import {Request,Response} from "express";
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {PasswordRecoveryInputModel} from "../../type/PasswordRecoveryInputModel";
import {queryUsersRepositories} from "../../../common/composition-root";


export const createPasswordRecovery = async (req: Request<{},{},PasswordRecoveryInputModel>, res: Response) => {
    try{
        const userEmail=req.body.email;
        const user=await queryUsersRepositories.findByEmail(userEmail);
        if(!user){
            return res.status(HttpStatus.NotFound);
        }


        res.sendStatus(HttpStatus.NoContent);
    }
    catch(err){
        res.status(HttpStatus.InternalServerError).send(`password-recovery fault: ${err}`);
    }
}