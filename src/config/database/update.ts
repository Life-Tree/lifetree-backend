export interface Update {
    name: string;
    type: "ALTER_SCHEMA" | "CREATE_COLLECTION" | "INSERT_DATA" | "UPDATE_DATA";
    createdAt: Date;
    executed: boolean;
    fileName: string;
}

export interface Command{
    execute(): void;    
}