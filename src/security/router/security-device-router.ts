import {Router} from "express";
import {Security_Path} from "../../core/paths/paths";
import cookieParser from "cookie-parser";
import {getDevices} from "./handlers/get-devices";
import {deleteDevice} from "./handlers/delete-device";
import {deleteOtherDevice} from "./handlers/delete-other-device";

export const security_router=Router();

security_router.get(Security_Path.securityDevice,
    cookieParser(),
    getDevices)
.delete(Security_Path.securityDevice,
    cookieParser(),
    deleteOtherDevice)
.delete(Security_Path.securityDevice+"/:deviceId"
,cookieParser()
,deleteDevice)