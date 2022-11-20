import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtWithUserAuthGuard extends AuthGuard('jwt-with-user') {}
