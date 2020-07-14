"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStorage = void 0;
const storage_1 = require("@google-cloud/storage");
const fs = require("fs");
class GoogleStorage {
    async uploadFile(imgData) {
        const storage = new storage_1.Storage({
            keyFilename: 'APIKEY_GOOGLE.json'
        });
        const fileName = __dirname + "/" + imgData.substring(0, 21) + ".jpg";
        const bucket = storage.bucket('lifetree-v1');
        fs.writeFile(fileName, imgData, { encoding: 'base64' }, async (error) => {
            if (!error) {
                bucket.upload(fileName, (error) => {
                    if (!error) {
                        fs.unlink(fileName, error => {
                            if (!error) {
                                console.error('file delete ', imgData.substring(0, 21));
                            }
                        });
                    }
                });
            }
        });
        return (await bucket.file(imgData.substring(0, 21) + '.jpg').getSignedUrl({ action: 'read', expires: '12-31-2025' })).toString();
    }
}
exports.GoogleStorage = GoogleStorage;
//# sourceMappingURL=goolgeStorage.js.map