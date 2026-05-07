import express from "express";
import { getAllUsers } from "./handlers/get-All-users";
import { createUser } from "./handlers/create-user";
import { deleteUser } from "./handlers/delete-user";
import { UsersInputValidation } from "../middlewares/validation/validation-users";
import { adminGuard } from "../../core/middlewares/Guards/admin.guard";
import { paginationAndSortingValidation } from "../middlewares/paginationAndSorting/pagination-and-sorting-for-users";
import { UsersSortFields } from "../constants/users-sort-fields";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/inputValidationBlogs";

export const usersRouter = express.Router();

usersRouter
  .get(
    "/",
    adminGuard,
    paginationAndSortingValidation(UsersSortFields),
    getAllUsers,
  )
  .post(
    "/",
    adminGuard,
    UsersInputValidation,
    inputValidationResultMiddleware,
    createUser,
  )
  .delete("/:id", adminGuard, deleteUser);
