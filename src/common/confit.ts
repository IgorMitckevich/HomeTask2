import {config} from 'dotenv'

config()

export const  appConfig={

    SecretKey:process.env.SECRET_KEY as string,
}