import { Body, Controller, Get, Inject, Param, Post, Request, UseGuards } from "@nestjs/common";
import { Credential } from "src/users/core/domain/credential";
import { User } from "src/users/core/domain/user";
import { UserPassCredential } from "src/users/core/domain/userPassCredential";
import { ISignupService } from "src/users/core/ports/inbounding/signup.service";
import { ITokenGenerator } from "src/users/core/ports/outbounding/token.generator";
import { LocalAuthGuard } from "../middleware/authentication/local.guard";
import { RegisterDto, RegisterDtoMapper } from "../dtos/register.dto";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('TokenGeneratorJwt')
        private tokenGenerator: ITokenGenerator,
        @Inject('SignupServiceImpl')
        private signupService: ISignupService,
        private registerDtoMapper: RegisterDtoMapper
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        const user: User = req.user;
        const token:string = this.tokenGenerator.generateToken(user.getId(),user.getEmail());
        return {access_token: token};
    }
    
    @Post('signup')
    async signup(@Body() registerDto: RegisterDto): Promise<{ registered: boolean; reason?: string }>{
        const credential: Credential = this.registerDtoMapper.getUserPassCredential(registerDto);
        const user: User = await this.registerDtoMapper.getUser(registerDto);
        const response = await this.signupService.signup(user, credential);
        if(response.get('status') == 1) {
            return {registered: true};
        }
        return {registered: false, reason: response.get('reason')};
    }

    @Get('signup/activate/:userId/:activationToken')
    async activate(@Param('userId') userId: string, @Param('activationToken') activationToken: string): Promise<{ activated: boolean; }> {
        const credential: UserPassCredential = new UserPassCredential();
        credential.setUserId(userId);
        credential.setActivationToken(activationToken);
        const response = await this.signupService.activateCredential(credential);
        if(response.get('status') == 1) {
            return {activated: true};
        }
        return {activated: false};
    }
}