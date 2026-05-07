import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { mapPaginatorUserViewModel } from "../mappers/map-paginated-users";
import { matchedData } from "express-validator";
import { PaginatorInput } from "../../types/Paginator-input";
import { queryUsersRepositories } from "../../repositories/query-user-repositories";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const sanitizedQuery = matchedData<PaginatorInput>(req, {
      locations: ["query"],
      includeOptionals: true,
    });

    const queryInput = { ...sanitizedQuery };
    const allUsers = await queryUsersRepositories.getUsers(queryInput);

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
};
