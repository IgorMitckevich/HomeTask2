import { body} from 'express-validator';


const loginOrEmailInputPassword=body('loginOrEmail')
    .exists()
    .withMessage('loginOrEmail required')
    .isString()
    .withMessage('loginOrEmail must be a string value')
export const AuthInputPassword=body('password')
    .exists()
    .withMessage('password required')
    .isString()
    .withMessage('password must be a string value')
    .trim()



export const AuthInputValidation=[
    loginOrEmailInputPassword,
    AuthInputPassword,
]