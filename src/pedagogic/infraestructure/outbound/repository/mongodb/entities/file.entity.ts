import { FileType } from "src/pedagogic/core/enums/enums";

export class FileEntity {
    public type: FileType
    public url: string;
    public base64: string;
}