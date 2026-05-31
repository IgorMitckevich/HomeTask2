import express from "express";
import { UsersInputValidation } from "../middlewares/validation/validation-users";
import { adminGuard } from "../../core/middlewares/Guards/admin.guard";
import { paginationAndSortingValidation } from "../middlewares/paginationAndSorting/pagination-and-sorting-for-users";
import { UsersSortFields } from "../constants/users-sort-fields";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/inputValidationBlogs";
import {container} from "../../composition-root";
import {UsersController} from "./users-controller";

export const usersRouter = express.Router();

const usersController=container.get(UsersController);

usersRouter
  .get(
    "/",
    adminGuard,
    paginationAndSortingValidation(UsersSortFields),
      usersController.getAllUsers.bind(usersController)
  )
  .post(
    "/",
    adminGuard,
    UsersInputValidation,
    inputValidationResultMiddleware,
      usersController.createUser.bind(usersController),
  )
  .delete("/:id", adminGuard, usersController.deleteUser.bind(usersController));
