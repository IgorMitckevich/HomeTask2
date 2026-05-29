import {devicesCollection, expiredTokensCollection} from "../../db/mongo.db";
import {DeviceDbModel} from "../types/device-DB-model";


export class DeviceService{
    async deleteSessionDevice(deviceId:string):Promise<void>{
       try{
           await expiredTokensCollection.deleteOne({deviceId});
        await devicesCollection.deleteOne({deviceId});
       } catch (error) {
           console.error('Error in deleteSessionDevice:', error);
           throw error;
       }
    }
    async deleteAllSessionDevices(deviceId:string):Promise<void>{
        try{
            await expiredTokensCollection.deleteMany({deviceId:{$ne:deviceId}});
        await devicesCollection.deleteMany({deviceId:{$ne:deviceId}});
        }
        catch (error)
        {
        console.error('Error in deleteSessionDevice:', error);
        throw error;
        }
    }
    async findDevice(deviceId:string):Promise<DeviceDbModel|null>{
        return await devicesCollection.findOne({deviceId});

    }
}

export const sessionDeviceService=new DeviceService();

