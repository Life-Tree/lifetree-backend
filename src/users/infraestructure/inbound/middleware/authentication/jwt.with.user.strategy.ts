import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConstants } from '../../../outbound/tokenGenerators/constants';
import { IUserService } from 'src/users/core/ports/inbounding/user.service';
import { User } from 'src/users/core/domain/user';
import { idTypeString } from 'src/users/core/enums/enums';

@Injectable()
export class JwtWithUserStrategy extends PassportStrategy(Strategy, 'jwt-with-user') {
  constructor(@Inject('UserServiceImpl')  private userService: IUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user: User = await this.userService.getUserById(payload.sub);
    return { 
      userId: payload.sub, 
      username: payload.username, 
      address: user.getAddress(), 
      firstName: user.getFirstName(), 
      lastName: user.getLastName(), 
      idType: idTypeString[user.getIdtype()], 
      idNumber: user.getIdNumber(),
      phone: user.getPhone()
    };
  }
}