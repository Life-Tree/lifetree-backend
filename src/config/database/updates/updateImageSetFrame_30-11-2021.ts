import { db } from "src/main";
import { ImageSet } from "src/models/arboles/clases/imageset";
import { Command, Update } from "../update";
import { Frame } from "src/models/arboles/enums/enums";
import { Intervencion } from "src/models/arboles/clases/intervencion";


export class UpdateImageSetFrame implements Command{
    private update: Update = {
        name: 'update-imageset-frame',
        type: 'UPDATE_DATA',
        createdAt: new Date(),
        executed: true,
        fileName: 'updateImageSetFrame_30-11-2021'
    }

    async execute(): Promise<void> {
        
        await this.verifyCommandExecution().then( async (executed) => {
            if (!executed){
                await db.collection('arboles').find().toArray().then ( async (result) => {                    
                    for (const tree of result){
                        if(tree.imageSet != null && tree.imageSet.images != undefined && tree.imageSet.images.length > 0){
                            
                            let imageSet: ImageSet = new ImageSet();
                            for (const img of tree.imageSet.images){
                                if(img.frame == "TRONCO"){
                                    img.frame = Frame.TALLO;
                                }
                                if(img.frame == "RAMAS"){
                                    img.frame = Frame.FRUTO
                                }                                
                                imageSet.addImage({frame: img.frame, url: img.url, base64: img.base64})
                            }                       
                            tree.imageSet = imageSet;
                            let intervenciones: Intervencion[] = [];
                            for (const inter of tree.intervenciones){
                                let imgSet = new ImageSet();
                                for (const img of inter.imageSet.images){
                                    if(img.frame == "TRONCO"){
                                        img.frame = Frame.TALLO;
                                    }
                                    if(img.frame == "RAMAS"){
                                        img.frame = Frame.FRUTO
                                    }
                                    imgSet.addImage({frame: img.frame, url: img.url, base64: img.base64})
                                } 
                                let intervencion: Intervencion = new Intervencion(imgSet, inter.descripcion, inter.estado);
                                intervenciones.push(intervencion);
                            }
                            tree.intervenciones = intervenciones;                    
                            await db.collection('arboles').replaceOne({ "_id": tree._id }, tree, { upsert: true });
                        }                     
                    }                 
                    await this.register();
                });
            }
        });
        
    }

    private async register(): Promise<void> {        
        let collection = db.collection('Updates');
        await collection.replaceOne({"fileName":this.update.fileName}, this.update, { upsert: true });
        console.log('Update Excecuted! ' + this.update.fileName);
        
    }

    private async verifyCommandExecution(): Promise<boolean> {
        let result = await db.collection('Updates').findOne({ "fileName": this.update.fileName });
        if (result != null){
            if(result.executed){
                return true;
            }            
        }
        return false;
    }
    
}