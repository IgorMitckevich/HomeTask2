import {Request,Response} from 'express';
import {HttpStatus} from "../../core/https-statuses/httpStatuses";
import {mapForCreatedUsers} from "./mappers/map-for-newUser";
import {UserInputModel} from "../types/UserInputModel";
import {matchedData} from "express-validator";
import {PaginatorInput} from "../types/Paginator-input";
import {mapPaginatorUserViewModel} from "./mappers/map-paginated-users";
import {inject, injectable} from "inversify";
import {QueryUsersRepositories} from "../repositories/query-user-repositories";
import {UsersService} from "../application/users-service";

@injectable()
export class UsersController {
    constructor(@inject(QueryUsersRepositories) protected queryUsersRepositories: QueryUsersRepositories,
                @inject(UsersService) protected usersService:UsersService){

    }

    async createUser  (
    req: Request<{}, {}, UserInputModel>,
    res: Response) {
    try {
        const newUser: UserInputModel = {
            login: req.body.login,
            email: req.body.email,
            password: req.body.password,
        };

        const createdUser = await this.usersService.create(newUser);
        if (!createdUser) {
            return res.status(HttpStatus.BadRequest).send({
                errorsMessages: [
                    {
                        field: "email",
                        message: "Email already in use",
                    },
                ],
            });
        }
        const newUserViewModel = mapForCreatedUsers(createdUser);
        res.status(HttpStatus.Created).send(newUserViewModel);
    } catch (err: unknown) {
        res
            .status(HttpStatus.InternalServerError)
            .send(`error in post method with message: ${err}`);
    }
    }

    async deleteUser  (
        req: Request<{ id: string }, {}, {}>,
        res: Response,
    ): Promise<void>  {
        try {
            const UserId = req.params.id;
            if (!UserId) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }

            const deleteResult = await this.usersService.deleteUser(UserId);
            if (!deleteResult) {
                res.sendStatus(HttpStatus.NotFound);
                return;
            }
            res.sendStatus(HttpStatus.NoContent);
        } catch (err: unknown) {
            res
                .status(HttpStatus.InternalServerError)
                .send(`error in delete method with message: ${err}`);
        }
    }

    async getAllUsers (req: Request, res: Response) {
        try {
            const sanitizedQuery = matchedData<PaginatorInput>(req, {
                locations: ["query"],
                includeOptionals: true,
            });

            const queryInput = { ...sanitizedQuery };
            const allUsers = await this.queryUsersRepositories.getUsers(queryInput);

            const AllUsersViewModel = mapPaginatorUserViewModel(
                allUsers,
                sanitizedQuery.pageNumber,
                sanitizedQuery.pageSize,
            );

            res.status(HttpStatus.Ok).send(AllUsersViewModel);
        } catch (err) {
            res
                .status(HttpStatus.InternalServerError)
                .send(`error in get method with message: ${err}`);
        }
    }
}