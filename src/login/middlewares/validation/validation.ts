import { body } from "express-validator";

const loginOrEmailInputPassword = body("loginOrEmail")
  .exists()
  .withMessage("loginOrEmail required")
  .isString()
  .withMessage("loginOrEmail must be a string value");
export const AuthInputPassword = body("password")
  .exists()
  .withMessage("password required")
  .isString()
  .withMessage("password must be a string value")
  .trim();

export const checkingEmail = body("email")
  .exists()
  .withMessage("checkingEmail required")
  .isString()
  .withMessage("checkingEmail must be a string value")
  .matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")
  .withMessage("email must match the specified pattern");

export const checkingPassword=body("newPassword")
    .exists()
    .withMessage("newPassword required")
    .isString()
    .withMessage("newPassword must be a string value")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length must be at least between 6 and 20 symbols");

export const checkingRecoveryCode=body("recoveryCode")
    .exists()
    .withMessage("recoveryCode required")
    .isString().withMessage("recoveryCode must be a string value")

