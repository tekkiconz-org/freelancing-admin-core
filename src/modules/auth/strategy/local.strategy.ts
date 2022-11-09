import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Admin } from '../../admin/entity/admin.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(username: string, password: string): Promise<Partial<Admin>> {
        const admin = await this.authService.validateAdmin(username, password);
        if (!admin) {
            throw new UnauthorizedException();
        }
        return admin;
    }
}
