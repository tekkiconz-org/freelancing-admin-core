import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { AdminRepository } from '../admin/repository/admin.repository';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/entity/admin.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private refreshTokenConfig = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        secret: process.env.REFRESH_TOKEN_SECRET,
    };

    constructor(
        private adminService: AdminService,
        @InjectRepository(Admin)
        private adminRepository: AdminRepository,
        private jwtService: JwtService,
    ) {}

    async validateAdmin(email: string, password: string): Promise<Partial<Admin>> {
        const admin = await this.adminRepository.findOneBy({ email: email });
        const comparePassword = await bcrypt.compare(password, admin.password);
        if (admin) {
            throw new BadRequestException({ message: 'User is not exist' });
        }
        if (!comparePassword) {
            throw new ForbiddenException({ message: 'Admin is not exist' });
        }
        return {
            id: admin.id,
            email: admin.email,
        };
    }

    async login(req: Request): Promise<unknown> {
        const admin: Partial<Admin> = req.user;
        const payload = { email: admin.email, sub: admin.id };
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, this.refreshTokenConfig),
        };
    }
}
