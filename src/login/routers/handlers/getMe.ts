import { AuthMe } from "../../type/MeViewModel";
import { Response, Request } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
import { queryUsersRepositories } from "../../../users/repositories/query-user-repositories";

export async function getMe(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.user.id;
    const Me: AuthMe | null = await queryUsersRepositories.getUserByID(userId);
    if (!Me) {
      res.sendStatus(HttpStatus.Unauthorized);
      return;
    }

    res.status(HttpStatus.Ok).send(Me);
  } catch (err) {
    res.status(HttpStatus.InternalServerError).send({ err });
  }
}
