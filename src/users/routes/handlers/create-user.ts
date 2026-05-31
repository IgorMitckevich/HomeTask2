import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { UserInputModel } from "../../types/UserInputModel";
import { usersService } from "../../../composition-root";
import { mapForCreatedUsers } from "../mappers/map-for-newUser";

export const createUser = async (
  req: Request<{}, {}, UserInputModel>,
  res: Response,
) => {
  try {
    const newUser: UserInputModel = {
      login: req.body.login,
      email: req.body.email,
      password: req.body.password,
    };

    const createdUser = await usersService.create(newUser);
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
};
