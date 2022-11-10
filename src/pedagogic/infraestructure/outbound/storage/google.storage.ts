import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { IStorage } from 'src/pedagogic/core/ports/outbounding/storage';

@Injectable()
export class GoogleStorage implements IStorage {
    async saveFile(base64: string): Promise<string> {
        const storage = new Storage({
            keyFilename: 'APIKEY_GOOGLE.json'
        });
        const num = Math.random()
        // address and name of image to create
        const fileName: string = __dirname + "/" + num + base64.substring(4, 10) + ".jpg";
        console.log(fileName)
        // bucket of storage
        const bucket = storage.bucket('lifetree-v1');
        // create a local file with filename
        fs.writeFile(fileName, base64, { encoding: 'base64' }, async (error) => {
            if (!error) {
                // subir imagen a storage
                bucket.upload(fileName, (error) => {
                    if (!error) {
                        // elimina la imagen creada
                        fs.unlink(fileName, error => {
                            if (!error) {
                                console.error('file delete ', num + base64.substring(4, 10));
                            }
                        });
                    }
                })
            }
        })
        // return the image url 
        return (await bucket.file(num + base64.substring(4, 10) + '.jpg').getSignedUrl({ action: 'read', expires: '12-31-2025' })).toString()
    }
}