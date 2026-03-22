import { body } from "express-validator";

export const postsValidationTitle = body("title")
  .exists()
  .withMessage("title is required")
  .isString()
  .withMessage("title must be a string")
  .isLength({ min: 1, max: 30 })
  .withMessage("title length must be not more than 30 sybmols")
  .isNumeric()
  .withMessage("title must be a numeric string");

export const postsValidationShortDescription = body("shortDescription")
  .exists()
  .withMessage("shortDescription is required")
  .isString()
  .withMessage("shortDescription must be a string")
  .isLength({ min: 1, max: 100 })
  .withMessage("shortDescription length must be not more than 100 sybmols");

export const postsValidationContent = body("content")
  .exists()
  .withMessage("content is required")
  .isString()
  .withMessage("content must be a string")
  .isLength({ min: 1, max: 1000 })
  .withMessage("content length must be not more than 1000 sybmols");

export const postsValidationBlogId = body("blogId")
  .exists()
  .withMessage("blogId is required")
  .isString()
  .withMessage("blogId must be a string");

export const postValidation = [
  postsValidationTitle,
  postsValidationShortDescription,
  postsValidationContent,
  postsValidationBlogId,
];
