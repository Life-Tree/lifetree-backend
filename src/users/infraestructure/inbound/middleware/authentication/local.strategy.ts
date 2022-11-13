import { Inject, Injectable, UnauthorizedException, NotAcceptableException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserPassCredential } from "src/users/core/domain/userPassCredential";
import { IAuthenticator } from "src/users/core/ports/inbounding/authenticator";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('Authenticator') private authenticator: IAuthenticator) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const credential: UserPassCredential = new UserPassCredential();
    credential.setPassword(password);
    credential.setEmail(username);
    const response: Map<string,any> = await this.authenticator.login(credential);
    if (response.get('status') == 0) {
      if (response.get('user') == null){
        throw new UnauthorizedException();
      }
      throw new NotAcceptableException(response.get('reason'));
    }
    return response.get('user');
  }
}