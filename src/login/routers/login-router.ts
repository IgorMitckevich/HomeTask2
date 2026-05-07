import express from "express";
import { createLoginOrEmailAndPassword } from "./handlers/create";
import { getMe } from "./handlers/getMe";
import { accessTokenGuard } from "../middlewares/authorization";
import { Login_Path } from "../../core/paths/paths";
import {createRegistrationConfirmation} from "./handlers/create-registration-confirmation";
import {UsersInputValidation} from "../../users/middlewares/validation/validation-users";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/inputValidationBlogs";
import {createRegistration} from "./handlers/create-registration";
import {createRegistrationEmailResendingRequest} from "./handlers/create-Resitration-email-resending";
import {checkingEmail} from "../middlewares/validation/validation";
import cookieParser from "cookie-parser";
import {createRefreshToken} from "./handlers/create-refresh-token";
import {createLogout} from "./handlers/create-logout";

export const loginRouter = express.Router();

loginRouter
  .post(Login_Path.auth.login, createLoginOrEmailAndPassword)
  .get(Login_Path.auth.me, accessTokenGuard, getMe)
    .post(Login_Path.auth.registrationConfirmation,
        createRegistrationConfirmation)
    .post(Login_Path.auth.registration,
        UsersInputValidation,
        inputValidationResultMiddleware,
        createRegistration)
    .post(Login_Path.auth.registrationEmailResending,
        checkingEmail,
        inputValidationResultMiddleware,
        createRegistrationEmailResendingRequest)
    .post(Login_Path.auth.refreshToken,
        cookieParser(),
        createRefreshToken)
.post(Login_Path.auth.logout,
    cookieParser(),
    createLogout)