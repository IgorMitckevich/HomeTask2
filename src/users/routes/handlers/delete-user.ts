import { Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { usersService } from "../../application/users-service";

export const deleteUser = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
): Promise<void> => {
  try {
    const UserId = req.params.id;
    if (!UserId) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    const deleteResult = await usersService.deleteUser(UserId);
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
};
