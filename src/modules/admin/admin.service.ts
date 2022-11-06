import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/createAdminDto';
import { UpdateAdminDto } from './dto/updateAdminDto';
import { Admin } from './entity/admin.entity';
import { AdminRepository } from './repository/admin.repository';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: AdminRepository,
    ) {}

    async createAdmin(adminDto: CreateAdminDto): Promise<Admin> {
        const admin = new Admin();
        admin.email = adminDto.email;
        admin.name = adminDto.fullName;
        admin.password = adminDto.password;

        return await this.adminRepository.save(admin);
    }

    async getAllAdmin(): Promise<Admin[]> {
        return await this.adminRepository.find();
    }

    async getAdmin(id: string): Promise<Admin> {
        const numberId = parseInt(id);
        const admin = await this.adminRepository.findOneBy({ id: numberId });
        if (!admin) {
            throw new HttpException({ message: `This admin doesn't exist` }, HttpStatus.NOT_FOUND);
        }
        return await this.adminRepository.findOneBy({ id: numberId });
    }

    async updateAdmin(id: string, adminDto: UpdateAdminDto): Promise<Admin> {
        const numberId = parseInt(id);
        const admin = await this.adminRepository.findOneBy({ id: numberId });
        if (!admin) {
            throw new HttpException({ message: `This admin doesn't exist` }, HttpStatus.NOT_FOUND);
        }

        admin.email = adminDto.email;
        admin.name = adminDto.fullName;

        if (!adminDto.password) {
            admin.password = adminDto.password;
        }

        return await this.adminRepository.save(admin);
    }

    async deleteAdmin(id: string): Promise<unknown> {
        const numberId = parseInt(id);
        if (numberId === 1) {
            throw new HttpException({ message: `This user can't be deleted` }, HttpStatus.FORBIDDEN);
        }
        const admin = await this.adminRepository.findOneBy({ id: numberId });
        if (!admin) {
            throw new HttpException({ message: `This admin doesn't exist` }, HttpStatus.NOT_FOUND);
        }
        await this.adminRepository.remove([admin]);
        return {};
    }
}
