import { Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { Request } from 'express';
import { AdminService } from '../admin/admin.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: AdminService) {}

    @Post('/login')
    @ApiBody({
        type: LoginUserDto,
    })
    async login(@Req() req: Request): Promise<any> {
        return this.authService.login(req);
    }
}
