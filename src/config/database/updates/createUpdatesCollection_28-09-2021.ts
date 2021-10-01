import { db } from "src/main";
import { Command, Update } from "../update";


export class CreateUpdatesCollection implements Command{

    execute(): void {
        this.verifyCommandExecution().then( (executed) => {
            if (!executed){
                db.createCollection('Updates').then( (d) => {
                    this.register();
                });
            }
        });
        
    }

    private async register(): Promise<void> {
        let update: Update = {
            name: 'create-updates-collection',
            type: 'CREATE_COLLECTION',
            createdAt: new Date(),
            executed: true,
            fileName: 'createUpdatesCollection_28-09-2021'
        }
        let collection = db.collection('Updates');
        await collection.insertOne(update);
        console.log('Update Excecuted! ' + update.fileName);
        
    }

    private verifyCommandExecution(): Promise<boolean> {
        return db.collections().then(async (collections) => {
            for (let col of collections){
                if (col.collectionName == 'Updates'){
                    let result = await db.collection('Updates').findOne({ "fileName": 'createUpdatesCollection_28-09-2021' })
                    if (result != null){
                        return true;
                    }                    
                }
            }
            return false;
        });
    }
    
}