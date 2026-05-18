import {devicesCollection} from "../../db/mongo.db";
import {DeviceViewModel} from "../types/device-view-model";


export class queryRepositories{
    async getDevices():Promise<DeviceViewModel[]> {
        const allDevices= await devicesCollection.find({}).toArray();
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

export const queryDeviceRepositories=new queryRepositories();



