import { Intervencion } from "src/models/arboles/clases/intervencion";
import { EstadoArbol } from "src/models/arboles/clases/arbol";
import { ImageSet } from "src/models/arboles/clases/imageset";
import { Species } from "src/models/arboles/clases/especie";

export class ArbolDTO{
    descripcion: string;
    imageSet: ImageSet;
    ubicacion: {latitud: number; longitud: number; barrio: string;};  
    intervenciones?: Intervencion[];    
    estado?: EstadoArbol;
    species: {_id: string; name: string; scientificName: string; family: string};
}