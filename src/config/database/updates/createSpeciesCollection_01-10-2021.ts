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

export class CreateSpeciesCollection implements Command{
    
    private species: Species[] = [];
    private update: Update = {
        name: 'create-species-collection',
        type: 'CREATE_COLLECTION',
        createdAt: new Date(),
        executed: true,
        fileName: 'createSpeciesCollection_01-10-2021'
    }

    async execute(): Promise<void> {
        await this.verifyCommandExecution().then( (executed) => {
            if (!executed){
                this.collectionExists('Species').then ( (exists: boolean) => {
                    this.populateSpeciesList();
                    if (!exists){
                        db.createCollection<Species>('Species').then ( (result) => {
                            result.insertMany(this.species).then (()=>{
                                this.register();
                            });                            
                        });
                    } else {
                        db.collection<Species>('Species').insertMany(this.species).then(() => {
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

    private collectionExists(colName: string): Promise<boolean> {
        return db.collections().then( (collections) => {
            for (let col of collections){
                if (col.collectionName == colName){
                    return true;             
                }
            }
            return false;
        });
    }

    private populateSpeciesList() {

        this.species.push(new Species('Caracoli', 'Anacardium excelsum', 'Anacardiaceae'));
        this.species.push(new Species('Diomate', 'Astronium graveolens', 'Anacardiaceae'));
        this.species.push(new Species('Pedro Hernández', 'Toxicodendron striatum', 'Anacardiaceae'));
        this.species.push(new Species('Amargoso', 'Aspidosperma cuspa', 'Apocynaceae'));
        this.species.push(new Species('Mano de tigre', 'Oreopanax acerifolius', 'Araliaceae'));
        this.species.push(new Species('Palma de vino', 'Attalea butyracea', 'Arecaceae'));
        this.species.push(new Species('Palma escoba', 'Cryosophila kalbreyeri', 'Arecaceae'));
        this.species.push(new Species('Palma amarga', 'Sabal mauritiiformis', 'Arecaceae'));
        this.species.push(new Species('Campano', 'Bignonia aequinoctialis', 'Bignoniaceae'));
        this.species.push(new Species('Catabre', 'Bignonia diversifolia', 'Bignoniaceae'));
        // 10
        this.species.push(new Species('Totumo', 'Crescentia cujete', 'Bignoniaceae'));
        this.species.push(new Species('Cañaguate', 'Handroanthus chrysanthus', 'Bignoniaceae'));
        this.species.push(new Species('Guayacán', 'Handroanthus ochraceus', 'Bignoniaceae'));
        this.species.push(new Species('Resbalamono', 'Bursera simaruba', 'Burseraceae'));
        this.species.push(new Species('Tatamaco', 'Bursera tomentosa', 'Burseraceae'));
        this.species.push(new Species('Guanabanito', 'Capparidastrum frondosum', 'Capparaceae'));
        this.species.push(new Species('Mal enterrado', 'Cynophalla hastata', 'Capparaceae'));
        this.species.push(new Species('Calabacilla', 'Cynophalla polyantha', 'Capparaceae'));
        this.species.push(new Species('Calabacilla', 'Parinari pachyphylla', 'Chrysobalanaceae'));
        this.species.push(new Species('Varahumo', 'Cordia alliodora', 'Cordiacea'));
        // 20
        this.species.push(new Species('Sangregao', 'Carludovica palmata', 'Cyclanthaceae'));
        this.species.push(new Species('Sangregao', 'Croton fragrans', 'Euphorbiaceae'));
        this.species.push(new Species('Tronador', 'Croton gossypiifolius', 'Euphorbiaceae'));
        this.species.push(new Species('Lengua de venado', 'Croton hibiscifolius', 'Euphorbiaceae'));
        this.species.push(new Species('Rabo de iguana', 'Hura crepitans', 'Euphorbiaceae'));
        this.species.push(new Species('Capote', 'Mabea montana', 'Euphorbiaceae'));
        this.species.push(new Species('Ojo de buey', 'Machaerium biovulatum', 'Fabaceae'));
        this.species.push(new Species('Guacamayo', 'Machaerium capote', 'Fabaceae'));
        this.species.push(new Species('Carbonero', 'Mucuna mutisiana', 'Fabaceae'));
        this.species.push(new Species('Orejero', 'Albizia niopoides', 'Fabaceae'));
        // 30
        this.species.push(new Species('Palma iraca', 'Calliandra magdalenae', 'Fabaceae'));
        this.species.push(new Species('Mosquero', 'Enterolobium schomburgkii', 'Fabaceae'));
        this.species.push(new Species('Cachingo', 'Erythrina fusca', 'Fabaceae'));
        this.species.push(new Species('Palo hediondo', 'Lonchocarpus atropurpureus', 'Fabaceae'));
        this.species.push(new Species('Trébol', 'Platymiscium hebestachyum', 'Fabaceae'));
        this.species.push(new Species('Iguá', 'Pseudosamanea guachapele', 'Fabaceae'));
        this.species.push(new Species('Frijolillo', 'Swartzia robiniifolia', 'Fabaceae'));
        this.species.push(new Species('Arará', 'Swartzia simplex', 'Fabaceae'));
        this.species.push(new Species('Juan de la verdad', 'Aegiphila laeta', 'Lamiaceae'));
        this.species.push(new Species('Laurel', 'Cinnamomum triplinerve', 'Lauraceae'));
        // 40
        this.species.push(new Species('Coco de mono', 'Lecythis minor', 'Lecythidaceae'));
        this.species.push(new Species('Pelarejo', 'Byrsonima crassifolia', 'Malpighiaceae'));
        this.species.push(new Species('Macondo', 'Cavanillesia platanifolia', 'Malvaceae'));
        this.species.push(new Species('Ceiba bruja', 'Ceiba pentandra', 'Malvaceae'));
        this.species.push(new Species('Guásimo', 'Guazuma ulmifolia', 'Malvaceae'));
        this.species.push(new Species('Balso', 'Ochroma pyramidale', 'Malvaceae'));
        this.species.push(new Species('Majagua', 'Pseudobombax septenatum', 'Malvaceae'));
        this.species.push(new Species('Camajón', 'Sterculia apetala', 'Malvaceae'));
        this.species.push(new Species('Cedro macho', 'Guarea guidonia', 'Meliaceae'));
        this.species.push(new Species('Coya blanco', 'Trichilia carinata', 'Meliaceae'));
        // 50
        this.species.push(new Species('Cedrillo', 'Trichilia elegans', 'Meliaceae'));
        this.species.push(new Species('Vara de piedra', 'Trichilia martiana', 'Meliaceae'));
        this.species.push(new Species('Guacharaca', 'Trichilia pallida', 'Meliaceae'));
        this.species.push(new Species('Higuerón', 'Ficus insipida', 'Moraceae'));
        this.species.push(new Species('Caucho', 'Ficus obtusifolia', 'Moraceae'));
        this.species.push(new Species('Dinde', 'Maclura tinctoria', 'Moraceae'));
        this.species.push(new Species('Chitató', 'Muntigia calabura', 'Muntingiaceae'));
        this.species.push(new Species('Arrayán', 'Eugenia biflora', 'Myrtaceae'));
        this.species.push(new Species('Capulín', 'Eugenia venezuelensis', 'Myrtaceae'));
        this.species.push(new Species('Arrayán de Limón', 'Eugenia flavescens', 'Myrtaceae'));
        // 60
        this.species.push(new Species('Payo', 'Eugenia florida', 'Myrtaceae'));
        this.species.push(new Species('Arrayán', 'Eugenia oerstediana', 'Myrtaceae'));
        this.species.push(new Species('Arrayán de monte', 'Eugenia procera', 'Myrtaceae'));
        this.species.push(new Species('Guayabo agrio', 'Psidium guineense', 'Myrtaceae'));
        this.species.push(new Species('Cordoncillo', 'Piper aduncum', 'Piperaceae'));
        this.species.push(new Species('Mariangola', 'Coutarea hexandra', 'Rubiaceae'));
        this.species.push(new Species('Pijiño', 'Simira cordifolia', 'Rubiaceae'));
        this.species.push(new Species('Bilanda', 'Amyris pinnata', 'Rutaceae'));
        this.species.push(new Species('Cuala', 'Esenbeckia alata', 'Rutaceae'));
        this.species.push(new Species('Tachuelo', 'Zanthoxylum rhoifolium', 'Rutaceae'));
        // 70
        this.species.push(new Species('Tachuelo lagarto', 'Zanthoxylum acuminatum', 'Rutaceae'));
        this.species.push(new Species('Sando', 'Zanthoxylum lenticulare', 'Rutaceae'));
        this.species.push(new Species('Huesito', 'Banara ibaguensis', 'Salicaceae'));
        this.species.push(new Species('Cucaracho', 'Casearia sylvestris', 'Salicaceae'));
        this.species.push(new Species('Guacharaco', 'Cupania americana', 'Sapindaceae'));
        this.species.push(new Species('Mestizo', 'Cupania cinerea', 'Sapindaceae'));
        this.species.push(new Species('Chicharrón', 'Dilodendron costaricense', 'Sapindaceae'));
        this.species.push(new Species('Caimo', 'Chrysophyllum venezuelanense', 'Sapotaceae'));
        this.species.push(new Species('Mapurito', 'Simaba ferruginea', 'Simaroubaceae'));
        this.species.push(new Species('Palo blanco', 'Citharexylum kunthianum', 'Verbenaceae'));
        // 80
        
    }
    
}