import { db } from "src/main";
import { Arbol } from "src/models/arboles/clases/arbol";
import { ImageSet } from "src/models/arboles/clases/imageset";
import { Command, Update } from "../update";
import { Frame } from "src/models/arboles/enums/enums";
import { Intervencion } from "src/models/arboles/clases/intervencion";


export class UpdateArbolesSchema implements Command{

    async execute(): Promise<void> {
        await this.verifyCommandExecution().then( (executed) => {
            if (!executed){
                db.collection('arboles').find().toArray().then ( (result) => {
                    for (const tree of result){
                        if( tree.imagenURL != undefined && tree.imagenURL != null && tree.imagenURL != ''){
                            
                            let imageSet: ImageSet = new ImageSet();
                            imageSet.addImage({frame: Frame.TRONCO, url: tree.imagenURL, base64: ''});                        
                            let arbol: Arbol = new Arbol(tree.descripcion, tree.ubicacion, imageSet);
                            let intervenciones: Intervencion[] = [];
                            for (const inter of tree.intervenciones){
                                imageSet = new ImageSet();
                                imageSet.addImage({frame: Frame.TRONCO, url: inter.imagenURL, base64: ''});
                                let intervencion: Intervencion = new Intervencion(imageSet, inter.descripcion, inter.estado);
                                intervenciones.push(intervencion);
                            }
                            arbol.setIntervenciones(intervenciones);
                            arbol.setEstado(tree.estado);                          
                            db.collection('arboles').replaceOne({ "_id": tree._id }, arbol, { upsert: true });
                        }                     
                    }                 
                    this.register();
                });
            }
        });
        
    }

    private async register(): Promise<void> {
        let update: Update = {
            name: 'update-arboles-schema',
            type: 'ALTER_SCHEMA',
            createdAt: new Date(),
            executed: true,
            fileName: 'updateArbolesSchema_30-09-2021'
        }
        let collection = db.collection('Updates');
        await collection.replaceOne({"fileName":'updateArbolesSchema_30-09-2021'}, update, { upsert: true });
        console.log('Update Excecuted! ' + update.fileName);
        
    }

    private async verifyCommandExecution(): Promise<boolean> {
        let result = await db.collection('Updates').findOne({ "fileName": 'updateArbolesSchema_30-09-2021' });
        if (result != null){
            if(result.executed){
                return true;
            }            
        }
        return false;
    }
    
}