export interface Update {
    name: string;
    type: "ALTER_SCHEMA" | "CREATE_COLLECTION";
    createdAt: Date;
    executed: boolean;
    fileName: string;
}

export interface Command{
    execute(): void;    
}