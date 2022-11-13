import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './infraestructure/inbound/middleware/authentication/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './infraestructure/outbound/tokenGenerators/constants';
import { JwtStrategy } from './infraestructure/inbound/middleware/authentication/jwt.strategy';
import { AuthController } from './infraestructure/inbound/rest/auth.rest.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EncoderBcrypt } from './infraestructure/outbound/encoder/encoder';
import { EmailSenderNodeMailer } from './infraestructure/outbound/emailSender/email.sender';
import { TokenGeneratorJwt } from './infraestructure/outbound/tokenGenerators/token.generator';
import { PermissionRepositoryMongo } from './infraestructure/outbound/repository/mongodb/permission.repository';
import { PermissionEntityMapper } from './infraestructure/outbound/repository/mongodb/entities/permission.entity';
import { RoleEntityMapper } from './infraestructure/outbound/repository/mongodb/entities/role.entity';
import { RoleRepositoryMongo } from './infraestructure/outbound/repository/mongodb/role.repository';
import { UserPassCredentialEntityMapper } from './infraestructure/outbound/repository/mongodb/entities/user.pass.credential.entity';
import { UserPassCredentialRepositoryMongo } from './infraestructure/outbound/repository/mongodb/user.pass.credential.repository';
import { UserEntityMapper } from './infraestructure/outbound/repository/mongodb/entities/user.entiy';
import { UserRepositoryMongo } from './infraestructure/outbound/repository/mongodb/user.repository';
import { VisitorFactory } from './usecases/visitor.factory';
import { Authenticator } from './usecases/authenticator';
import { UserServiceImpl } from './usecases/user.service.impl';
import { RoleServiceImpl } from './usecases/role.service.impl';
import { PermissionServiceImpl } from './usecases/permission.service.impl';
import { Authorizer } from './usecases/authorizer';
import { LoginVisitor } from './infraestructure/outbound/visitors/login.visitor';
import { SaverVisitor } from './infraestructure/outbound/visitors/saver.visitor';
import { ActivaterVisitor } from './infraestructure/outbound/visitors/activater.visitor';
import { RegisterDtoMapper } from './infraestructure/inbound/dtos/register.dto';
import { UsersController } from './infraestructure/inbound/rest/users.controller';
import { SignupServiceImpl } from './usecases/signup.service.impl';
import { PermissionGuard } from './infraestructure/inbound/middleware/authorization/authorizer.guard';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
              host: process.env.SENDGRID_HOST,
              secure: false,
              auth: {
                user: process.env.SENDGRID_USER,
                pass: process.env.SENDGRID_PASS,
              },
            },
            defaults: {
              from: 'ebanoinfomation@gmail.com',
            },
            template: {
              dir: join(__dirname, './infraestructure/outbound/emailSender'),
              adapter: new HandlebarsAdapter(),
              options: {
                strict: true,
              },
            },
          }),        
        PassportModule, 
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [
        EncoderBcrypt,
        {
          provide: 'EncoderBcrypt',
          useClass: EncoderBcrypt,
        },
        EmailSenderNodeMailer,
        {
          provide: 'EmailSenderNodeMailer',
          useClass: EmailSenderNodeMailer,
        },
        TokenGeneratorJwt,
        {
          provide: 'TokenGeneratorJwt',
          useClass: TokenGeneratorJwt,
        },
        PermissionEntityMapper,
        PermissionRepositoryMongo,
        {
          provide: 'PermissionRepositoryMongo',
          useClass: PermissionRepositoryMongo,
        },
        RoleEntityMapper,
        RoleRepositoryMongo,
        {
          provide: 'RoleRepositoryMongo',
          useClass: RoleRepositoryMongo,
        },
        UserPassCredentialEntityMapper,
        UserPassCredentialRepositoryMongo,
        {
          provide: 'UserPassCredentialRepositoryMongo',
          useClass: UserPassCredentialRepositoryMongo,
        },
        UserEntityMapper,
        UserRepositoryMongo,
        {
          provide: 'UserRepositoryMongo',
          useClass: UserRepositoryMongo,
        },
        LoginVisitor,
        {
          provide: 'LoginVisitor',
          useClass: LoginVisitor,
        },
        SaverVisitor,
        {
          provide: 'SaverVisitor',
          useClass: SaverVisitor,
        },
        ActivaterVisitor,
        {
          provide: 'ActivaterVisitor',
          useClass: ActivaterVisitor,
        },
        VisitorFactory,
        {
          provide: 'VisitorFactory',
          useClass: VisitorFactory,
        },
        Authenticator,
        {
          provide: 'Authenticator',
          useClass: Authenticator,
        },
        PermissionServiceImpl,
        {
          provide: 'PermissionServiceImpl',
          useClass: PermissionServiceImpl,
        },
        RoleServiceImpl,
        {
          provide: 'RoleServiceImpl',
          useClass: RoleServiceImpl,
        },
        RegisterDtoMapper,
        UserServiceImpl,
        {
          provide: 'UserServiceImpl',
          useClass: UserServiceImpl,
        },
        SignupServiceImpl,
        {
          provide: 'SignupServiceImpl',
          useClass: SignupServiceImpl,
        },
        Authorizer,
        {
          provide: 'Authorizer',
          useClass: Authorizer,
        },
        LocalStrategy,
        JwtStrategy,
        PermissionGuard
    ],
    controllers: [UsersController, AuthController],
    exports: [
      Authorizer,
      {
        provide: 'Authorizer',
        useClass: Authorizer,
      },
    ],
})
export class UsersModule {}