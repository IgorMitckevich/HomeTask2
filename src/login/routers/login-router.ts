import express from "express";
import {createLoginOrEmailAndPassword} from "./handlers/create";
import {getMe} from "./handlers/getMe";
import {accessTokenGuard} from "../middlewares/authorization";
import {Login_Path} from "../../core/paths/paths";



export const loginRouter=express.Router();


loginRouter.post(Login_Path.auth.login, createLoginOrEmailAndPassword)
    .get(Login_Path.auth.me,
        accessTokenGuard,
        getMe)



