import { db } from "src/main";
import { Command, Update } from "../update";

export class InsertDefaultSpecies implements Command{
    private update: Update = {
        name: 'insert-default-species',
        type: 'INSERT_DATA',
        createdAt: new Date(),
        executed: true,
        fileName: 'insertDefaultSpecies_02-10-2021'
    }

    async execute(): Promise<void> {
        await this.verifyCommandExecution().then( (executed) => {
            if (!executed){        
                db.collection('Species').findOne({ "name": 'unknown' }).then((species) => {
                    db.collection('arboles').find().toArray().then((result) => {
                        for (const tree of result ){
                            tree.species = species._id;
                            db.collection('arboles').replaceOne({ "_id": tree._id }, tree, { upsert: true });
                        }
                        this.register();
                    });
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
        let result = await db.collection('Updates').findOne({ "fileName": this.update.fileName});
        if (result != null){
            if(result.executed){
                return true;
            }            
        }
        return false;
    }    
}