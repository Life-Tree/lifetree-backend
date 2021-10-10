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

export class InsertNewSpecies implements Command{
    private species: Species[] = [];
    private update: Update = {
        name: 'insert-new-species',
        type: 'INSERT_DATA',
        createdAt: new Date(),
        executed: true,
        fileName: 'insertNewSpecies_09-10-2021'
    }

    async execute(): Promise<void> {
        let executed = await this.verifyCommandExecution();
        if(!executed){
            let collection = db.collection<Species>('Species');
            this.populateSpeciesList();
            await collection.insertMany(this.species);
            await this.register();
        }       
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

    private populateSpeciesList() {
        this.species.push(new Species('Almendro', 'Terminalia catappa', 'Combretaceae'));
        this.species.push(new Species('Mango', 'Mangifera indica', 'Anacardiaceae'));
        this.species.push(new Species('Palma manila', 'Veitchia merrillii', 'Arecaceae'));
        this.species.push(new Species('Coco', 'Cocus nucifera', 'Arecaceae'));
        this.species.push(new Species('Palma areca', 'Dypsis lutenscens', 'Arecaceae'));
        this.species.push(new Species('Flor morado', 'Tabebuaia rosea', 'Bignoniaceae'));
        this.species.push(new Species('Matarratón', 'Glirisidia sepium', 'Fabaceae'));
        this.species.push(new Species('Caucho', 'Ficus benjamina', 'Moraceae'));        
    }
}