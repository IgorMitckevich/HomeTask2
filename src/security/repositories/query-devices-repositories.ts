import {injectable} from "inversify";
import {DeviceModel} from "../../db/mongo.db";
import {DeviceViewModel} from "../types/device-view-model";


@injectable()
export class QueryDevicesRepositories {
    async getDevices(userId:string):Promise<DeviceViewModel[]> {
        const allDevices= await DeviceModel.find({userId}).lean();
        return allDevices.map(value => {
            return {
                ip: value.ip,
                title: value.title,
                lastActiveDate: value.lastActiveDate,
                deviceId: value.deviceId
            }
        })
    }
}




