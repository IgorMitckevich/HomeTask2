import { body } from "express-validator";

export const UsersInputLogin = body("login")
  .exists()
  .withMessage("Login required")
  .isString()
  .withMessage("login must be a string value")
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage("Login should be more than 3 symbols, but less 10")
  .matches("^[a-zA-Z0-9_-]*$")
  .withMessage("login must match the specified pattern");

export const UserInputPassword = body("password")
  .exists()
  .withMessage("password required")
  .isString()
  .withMessage("password must be a string value")
  .trim()
  .isLength({ min: 6, max: 20 })
  .withMessage("password must be more than 6 symbols,but less 20");

export const UserInputEmail = body("email")
  .exists()
  .withMessage("email required")
  .isEmail()
  .isString()
  .withMessage("email must be a string value")
  .matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")
  .withMessage("email must match the specified pattern");

export const UsersInputValidation = [
  UsersInputLogin,
  UserInputPassword,
  UserInputEmail,
];
