import { EstadoIntervencion } from "src/models/arboles/clases/intervencion";
import { EstadoArbol } from "src/models/arboles/clases/arbol";

export class ArbolDTO{
    ubicacion: {latitud: number; longitud: number; barrio: string;}
    descripcion: string;
    intervenciones?: {imagenData:string, descripcion:string, estado: EstadoIntervencion}[];
    imagenData: string;
    estado?: EstadoArbol;
}