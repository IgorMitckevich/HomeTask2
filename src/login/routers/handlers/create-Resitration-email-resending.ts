import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { RegistrationEmailResending } from "../../type/Registration-Email-Resending";
import { queryUsersRepositories } from "../../../common/composition-root";
import { randomUUID } from "node:crypto";
import { usersService } from "../../../common/composition-root";
import { nodemailerService } from "../../../common/composition-root";
import { createErrorsMessages } from "../../../core/middlewares/validation/inputValidationBlogs";

export const createRegistrationEmailResendingRequest = async (
  req: Request<{}, {}, RegistrationEmailResending>,
  res: Response,
) => {
  try {
    const inputEmail = req.body.email;
    const findUser = await queryUsersRepositories.findByEmail(inputEmail);
    if (!findUser) {
      res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorsMessages([
            { field: "email", message: "email not exists" },
          ]),
        );
      return;
    }
    if (findUser.emailConfirmation.isConfirmed) {
      res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorsMessages([
            { field: "email", message: "email is already confirmed" },
          ]),
        );
      return;
    }

    const newCode = randomUUID();
    const userWithNewCode =
      await usersService.repeatSendingEmailConfirmationCode(
        findUser.id,
        newCode,
      );

    try {
       nodemailerService.sendEmail(inputEmail, newCode);
      res.sendStatus(HttpStatus.NoContent);
    } catch (err) {
      console.log("error with sending email");
      res.sendStatus(HttpStatus.InternalServerError);
    }
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
