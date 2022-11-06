import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controlller';
import { AdminService } from './admin.service';
import { Admin } from './entity/admin.entity';
import { AdminRepository } from './repository/admin.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    providers: [AdminService, AdminRepository],
    exports: [AdminService],
    controllers: [AdminController],
})
export class AdminModule {}
