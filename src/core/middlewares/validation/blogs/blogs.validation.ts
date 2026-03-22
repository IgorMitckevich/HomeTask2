import {param,body} from "express-validator";
import {APIErrorResult, FieldError} from "../../../types/ErrorsModel";


// export const blogsValidationId=param('Id')
//     .exists().withMessage('Id is required')


const blogsValidationName=body('name')
.exists().withMessage('name is required')
.isString().withMessage('name must be a string')
.isLength({min:1,max:15}).withMessage('name length must be not more than 15 sybmols')

const blogsValidationDescription=body('description')
.exists().withMessage('description is required')
    .isString().withMessage('description must be a string')
    .isLength({min:1,max:500}).withMessage('description length must be not more than 500 sybmols')

const blogsValidationWebsiteUrl=body('websiteUrl')
    .exists().withMessage('websiteUrl is required')
    .isString().withMessage('websiteUrl must be a string')
    .isLength({min:1,max:100}).withMessage('websiteUrl length must be not more than 100 sybmols')
    .matches( 'https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$').withMessage('websiteUrl must match the specified URL pattern')


export const blogsValidation=[blogsValidationName,
    blogsValidationDescription,
    blogsValidationWebsiteUrl]

