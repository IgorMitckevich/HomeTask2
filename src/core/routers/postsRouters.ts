import express,{Request,Response} from 'express';
import {HttpStatus} from "../https-statuses/httpStatuses";

export const postsRouter = express.Router();

postsRouter.
get('/', (req: Request, res: Response) => {

})