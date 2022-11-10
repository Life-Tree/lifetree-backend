export enum ResultMesagge{
    NO_ES_ARBOL = "NO ES UN ARBOL",
    PROBLEMA_STORAGE_SERVICE = "PROBLEMA CON STORAGE SERVICE",
    PROBLEMA_EN_BASE_DE_DATOS= "PROBLEMA AL GUARDAR EN BASE DE DATOS",
    EXITO = "EL ARBOL SE HA GUARDADO CORRECTAMENTE"
}

export enum TreePart{
    SHEET = 1, 
    ROOT = 2,
    STEM = 3,       
    FRUIT = 4,
    FLOWER = 5,
    WHOLE = 6
}

export enum HealthStatusEnum{
    HEALTHY = 1,
    AFFECTED = 2,
}

export enum OriginEnum{
    INTRODUCED = 1,
    NATIVE = 2,
}

export enum FrecuentLocationEnum{
    RURAL = 1,
    URBAN = 2,
}

export enum MorfologicalClasificationEnum{
    TREE = 1,
    BUSH = 2,
}

export enum ConservationStatusEnum{
    NE = 1, // Not rated
    DD = 2, // Insufficient data
    LC = 3, // Minor concern
    NT = 4, // Near threatened
    VU = 5, // Vulnerable
    EN = 6, // Endangered
    CR = 7, // Critically endangered
    EW = 8, // Extinct in the wild
    EX = 9, // Extinct
}