import express from "express";

import {createLoginOrEmailAndPassword} from "./handlers/create";
import {AuthInputValidation} from "../middlewares/validation/validation";
import {inputValidation} from "../middlewares/validation/errosValidation";
import {adminGuard} from "../../core/middlewares/admin.guard";


export const loginRouter=express.Router();


loginRouter.post("/", createLoginOrEmailAndPassword)



