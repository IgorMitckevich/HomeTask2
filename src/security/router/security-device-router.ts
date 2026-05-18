import {Router} from "express";
import {Security_Path} from "../../core/paths/paths";
import cookieParser from "cookie-parser";
import {getDevices} from "./handlers/get-devices";


export const security_router=Router();

security_router.get(Security_Path.securityDevice,
    cookieParser(),
    getDevices)
.delete(Security_Path.securityDevice)
.delete(Security_Path.securityDevice+":deviceId")