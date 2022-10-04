import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

    @Post('/login')
    @ApiBody({
        type: LoginUserDto,
    })
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request): Promise<any> {
        return this.authService.login(req);
    }
}
