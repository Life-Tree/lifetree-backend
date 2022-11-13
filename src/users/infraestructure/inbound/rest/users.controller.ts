import { Controller, Get, Inject, Param, UseGuards } from "@nestjs/common";
import { User } from "src/users/core/domain/user";
import { JwtAuthGuard } from "../middleware/authentication/jwt.guard";
import { RequirePermissions } from "../middleware/authorization/authorizer.decorator";
import { PermissionName } from "src/users/core/enums/enums";
import { IUserService } from "src/users/core/ports/inbounding/user.service";
import { PermissionGuard } from "../middleware/authorization/authorizer.guard";

@Controller('users')
export class UsersController {
    constructor(
        @Inject('UserServiceImpl')
        private userService: IUserService
    ){}

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.USER_READ)
    @Get('byrole/:roleName/')
    async getUsersByRoleName(@Param('roleName') roleName: string): Promise<User[]> {
        return this.userService.getUsersByRoleName(roleName);
    }
}