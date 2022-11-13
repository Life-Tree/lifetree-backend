export interface ITokenGenerator{
    generateToken(userId: string, userEmail: string): string;
}