import { CreateDefaultSpecies } from "./updates/createDefaultSpecies_02-10-2021";
import { CreateSpeciesCollection } from "./updates/createSpeciesCollection_01-10-2021";
import { CreateUpdatesCollection } from "./updates/createUpdatesCollection_28-09-2021";
import { InsertDefaultSpecies } from "./updates/insertDefaultSpecies_02-10-2021";
import { InsertNewSpecies } from "./updates/insertNewSpecies_09-10-2021";
import { UpdateArbolesSchema } from "./updates/updateArbolesSchema_30-09-2021";

export async function update(): Promise<void>{
    await new CreateUpdatesCollection().execute();
    await new UpdateArbolesSchema().execute();
    await new CreateSpeciesCollection().execute();
    await new CreateDefaultSpecies().execute();
    await new InsertDefaultSpecies().execute();
    await new InsertNewSpecies().execute();
}