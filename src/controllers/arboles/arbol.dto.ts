import { Intervencion } from "src/models/arboles/clases/intervencion";
import { EstadoArbol } from "src/models/arboles/clases/arbol";
import { ImageSet } from "src/models/arboles/clases/imageset";

export class ArbolDTO{
    descripcion: string;
    imageSet: ImageSet;
    ubicacion: {latitud: number; longitud: number; barrio: string;};  
    intervenciones?: Intervencion[];    
    estado?: EstadoArbol;
}