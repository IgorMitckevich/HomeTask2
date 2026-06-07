import {DeviceModel, ExpiredCollectionModel} from "../../db/mongo.db";
import {DeviceDbModel} from "../types/device-DB-model";
import {injectable} from "inversify";

@injectable()
export class DevicesService {
    async deleteSessionDevice(deviceId:string):Promise<void>{
       try{
           await ExpiredCollectionModel.deleteOne({deviceId});
        await DeviceModel.deleteOne({deviceId});
       } catch (error) {
           console.error('Error in deleteSessionDevice:', error);
           throw error;
       }
    }
    async deleteAllSessionDevices(deviceId:string):Promise<void>{
        try{
            await ExpiredCollectionModel.deleteMany({deviceId:{$ne:deviceId}});
        await DeviceModel.deleteMany({deviceId:{$ne:deviceId}});
        }
        catch (error)
        {
        console.error('Error in deleteSessionDevice:', error);
        throw error;
        }
    }
    async findDevice(deviceId:string):Promise<DeviceDbModel|null>{
        return await DeviceModel.findOne({deviceId});

    }
}


