import { db } from "src/main";
import { Command, Update } from "../update";

class Species{
    private name: string;
    private family: string;
    private scientificName: string;

    constructor(name: string, scientificName: string, family: string ){
        this.name = name;
        this.scientificName = scientificName;
        this.family = family;
    }
}

export class CreateDefaultSpecies implements Command{
    private update: Update = {
        name: 'create-default-species',
        type: 'INSERT_DATA',
        createdAt: new Date(),
        executed: true,
        fileName: 'createDefaultSpecies_02-10-2021'
    }

    async execute(): Promise<void> {
        await this.verifyCommandExecution().then( (executed) => {
            if (!executed){
                let collection = db.collection<Species>('Species');
                collection.findOne({ "name": 'unknown' }).then (( value: Species) => {
                    if (value == null){
                        collection.insertOne(new Species('unknown', 'unknown', 'unknown')).then(() => {
                            this.register();
                        });
                    }
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