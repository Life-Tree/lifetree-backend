import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { IStorage } from 'src/reports/core/ports/outbounding/storage';

@Injectable()
export class GoogleStorage implements IStorage {
    async saveImage(imageB64: string): Promise<string> {
        const storage = new Storage({
            keyFilename: 'APIKEY_GOOGLE.json'
        });
        const num = Math.random()
        // address and name of image to create
        const fileName: string = __dirname + "/" + num + imageB64.substring(4, 10) + ".jpg";
        console.log(fileName)
        // bucket of storage
        const bucket = storage.bucket('lifetree-v1');
        // create a local file with filename
        fs.writeFile(fileName, imageB64, { encoding: 'base64' }, async (error) => {
            if (!error) {
                // subir imagen a storage
                bucket.upload(fileName, (error) => {
                    if (!error) {
                        // elimina la imagen creada
                        fs.unlink(fileName, error => {
                            if (!error) {
                                console.error('file delete ', num + imageB64.substring(4, 10));
                            }
                        });
                    }
                })
            }
        })
        // return the image url 
        return (await bucket.file(num + imageB64.substring(4, 10) + '.jpg').getSignedUrl({ action: 'read', expires: '12-31-2025' })).toString()
    }
}