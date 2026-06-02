import express from "express";
import { Login_Path } from "../../core/paths/paths";
import { UsersInputValidation } from "../../users/middlewares/validation/validation-users";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/inputValidationBlogs";
import {checkingEmail, checkingPassword, checkingRecoveryCode} from "../middlewares/validation/validation";
import cookieParser from "cookie-parser";
import {callCounting} from "../../setup-app";
import {Authentication} from "./authentication";
import {container} from "../../composition-root";


export const loginRouter = express.Router();

export const authentication = container.get(Authentication);

loginRouter
  .post(Login_Path.auth.login
      ,callCounting
,authentication.createLoginOrEmailAndPassword.bind(authentication))
  .get(Login_Path.auth.me
      , authentication.accessTokenGuard.bind(authentication)
      , authentication.getMe.bind(authentication))
  .post(
    Login_Path.auth.registrationConfirmation
      ,callCounting
      ,authentication.createRegistrationConfirmation.bind(authentication)
  )
  .post(
    Login_Path.auth.registration
      ,callCounting
      ,UsersInputValidation
      ,inputValidationResultMiddleware
      ,authentication.createRegistration.bind(authentication)
  )
  .post(
    Login_Path.auth.registrationEmailResending
    ,callCounting
      ,checkingEmail
      ,inputValidationResultMiddleware
    ,authentication.createRegistrationEmailResendingRequest.bind(authentication)
  )
  .post(Login_Path.auth.refreshToken
      , cookieParser()
      , authentication.createRefreshToken.bind(authentication))
  .post(Login_Path.auth.logout
      , cookieParser()
      , authentication.createLogout.bind(authentication))
    .post(Login_Path.auth.passwordRecovery
    ,callCounting
        ,checkingEmail
        ,inputValidationResultMiddleware
        ,authentication.createPasswordRecovery.bind(authentication))
    .post(Login_Path.auth.newPassword
    ,callCounting
        ,checkingPassword
        ,checkingRecoveryCode
        ,inputValidationResultMiddleware
    ,authentication.createNewPassword.bind(authentication))