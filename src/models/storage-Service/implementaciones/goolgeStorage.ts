import { IStorageService } from "../interfaces/storageService.interface";
import { Storage } from '@google-cloud/storage';
import * as fs from 'fs'

export class GoogleStorage implements IStorageService {

    // metodo que retorna la url de la imagen almacenada en el storage
    //parametro recibe la imagen codificada en base64
    public async uploadFile(imgData: string): Promise<string> {
        // instancia de api storage
        const storage = new Storage({
            keyFilename: 'APIKEY_GOOGLE.json'
        });
        const num = Math.random()
        // direccion y nombre de la imagen que se va crear
        const fileName: string = __dirname + "/" + num + imgData.substring(4, 10) + ".jpg";
        console.log(fileName)
        // bucket de storage
        const bucket = storage.bucket('lifetree-v1');
        // crea un archivo local con el nombre de fileName
        fs.writeFile(fileName, imgData, { encoding: 'base64' }, async (error) => {
            if (!error) {
                // subir imagen a storage
                bucket.upload(fileName, (error) => {
                    if (!error) {
                        // elimina la imagen creada
                        fs.unlink(fileName, error => {
                            if (!error) {
                                console.error('file delete ', num + imgData.substring(4, 10));
                            }
                        });
                    }
                })
            }
        })
        // retorna la url de la imagen almacenada
        return (await bucket.file(imgData.substring(0, 21) + '.jpg').getSignedUrl({ action: 'read', expires: '12-31-2025' })).toString()
    }
}
