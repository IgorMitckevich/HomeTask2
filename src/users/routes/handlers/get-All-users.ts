import {Request,Response} from "express";
import {HttpStatus} from "../../../core/https-statuses/httpStatuses";
import {usersService} from "../../application/users-service";
import {mapPaginatorUserViewModel} from "../mappers/map-paginated-users";
import {matchedData} from "express-validator";
import {PaginatedOutput} from "../../../core/types/Paginated-output";
import {PaginatorInput} from "../../types/Paginator-input";



export const getAllUsers = async (req: Request, res: Response) => {

    try{

        const sanitizedQuery = matchedData<PaginatorInput>(req,{
            locations: ['query'],
            includeOptionals: true,})

        const queryInput={...sanitizedQuery}
        const allUsers = await usersService.getAllUsers(queryInput);

        const AllUsersViewModel=mapPaginatorUserViewModel(allUsers, sanitizedQuery.pageNumber, sanitizedQuery.pageSize);

        res.status(HttpStatus.Ok).send(AllUsersViewModel);
    }
    catch(err){
        res.status(HttpStatus.InternalServerError).send(`error in get method with message: ${err}`);
    }
}