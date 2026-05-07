import { APIErrorResult, FieldError } from "../../../core/types/ErrorsModel";
import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from "express-validator";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/https-statuses/httpStatuses";

export const createErrorsMessages = (error: FieldError[]): APIErrorResult => {
  return { errorsMessages: error };
};

export const formatForErrors = (error: ValidationError): FieldError => {
  const expressError = error as unknown as FieldValidationError;
  return {
    field: expressError.path,
    message: expressError.msg,
  };
};

export const inputValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)
    .formatWith(formatForErrors)
    .array({ onlyFirstError: true });

  if (errors.length > 0) {
    res.sendStatus(HttpStatus.BadRequest);
    return;
  }

  next();
};
