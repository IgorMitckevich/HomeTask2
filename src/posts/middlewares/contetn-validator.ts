import {body} from 'express-validator'


export const contentValidation= body("content").
exists().withMessage('Content is required')
.isString().withMessage('Content must be a string')
.trim()
.isLength({ min: 20 ,max:300}).withMessage('The length of the string must be between 20 and 300 symbols')