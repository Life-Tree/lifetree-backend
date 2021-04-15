import { IStorageService } from "../interfaces/storageService.interface";
import cloudinary = require('cloudinary');
import * as cloud from "../../../config/environment/configuration"

export class CloudDinaryStorage implements IStorageService{
    constructor(){
        cloudinary.v2.config({
			cloud_name: 'lifetree-v2', //cloud.default().cloudinary1.cloud_name,//lifetree-v2
			api_key: '344499393185513',//cloud.default().cloudinary1.cloud_api_key,//344499393185513
			api_secret: 'xUrgS5x_Qnua1OyAU9mYPqdt7Co'//cloud.default().cloudinary1.cloud_api_secret//xUrgS5x_Qnua1OyAU9mYPqdt7Co
            //CLOUDINARY_URL=cloudinary://344499393185513:xUrgS5x_Qnua1OyAU9mYPqdt7Co@lifetree-v2
		});
    }

    async uploadFile(imgData: string): Promise<string> {
        const { url } = await cloudinary.v2.uploader.upload(imgData);
		return url;
    }
}