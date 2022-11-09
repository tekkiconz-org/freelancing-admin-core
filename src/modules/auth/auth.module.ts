import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Admin } from '../admin/entity/admin.entity';
import { AdminRepository } from '../admin/repository/admin.repository';
import { AdminModule } from '../admin/admin.module';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
    imports: [
        AdminModule,
        PassportModule,
        TypeOrmModule.forFeature([Admin]),
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET,
            signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
        }),
    ],
    providers: [AuthService, JwtStrategy, AdminRepository, LocalStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
