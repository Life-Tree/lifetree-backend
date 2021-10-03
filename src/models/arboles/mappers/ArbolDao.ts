import { ObjectId } from "bson";
import { EstadoArbol } from "../clases/arbol";
import { ImageSet } from "../clases/imageset";
import { Intervencion } from "../clases/intervencion";
import { Ubicacion } from "../clases/ubicacion";

export class ArbolDao{
    public _id?: ObjectId;
    public descripcion: string;
    public imageSet: ImageSet;    
    public ubicacion: Ubicacion;
    public intervenciones: Intervencion[];
    public estado: EstadoArbol;
    public species: ObjectId;
}