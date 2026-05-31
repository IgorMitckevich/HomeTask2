import {Router} from "express";
import {Security_Path} from "../../core/paths/paths";
import cookieParser from "cookie-parser";

import {DeviceController} from "./device-controller";
import {container} from "../../composition-root";

export const security_router=Router();

const deviceController=container.get(DeviceController)

security_router.get(Security_Path.securityDevice
    ,cookieParser()
    ,deviceController.getDevices.bind(deviceController),)
.delete(Security_Path.securityDevice
    ,cookieParser()
    ,deviceController.deleteOtherDevice.bind(deviceController),)
.delete(Security_Path.securityDevice+"/:deviceId"
,cookieParser()
,deviceController.deleteDevice.bind(deviceController))