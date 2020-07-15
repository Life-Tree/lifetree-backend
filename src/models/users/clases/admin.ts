export class Admin{
    nickname: string;
    password: string;

    constructor(nick:string, pass:string){
        this.nickname = nick;
        this.password = pass;
    }

    public getNickName(): string{
        return this.nickname;
    }

    public getPassWord(): string{
        return this.password;
    }

    public setNickName(nick:string): void{
        this.nickname = nick;
    }

    public setPassWord(pass:string): void{
        this.password = pass;
    }
}