import { CreateUpdatesCollection } from "./updates/createUpdatesCollection_28-09-2021";
import { UpdateArbolesSchema } from "./updates/updateArbolesSchema_30-09-2021";

export function update(): void{
    new CreateUpdatesCollection().execute();
    new UpdateArbolesSchema().execute();
}