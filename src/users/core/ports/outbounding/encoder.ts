export interface IEncoder{
    encodePassword(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}