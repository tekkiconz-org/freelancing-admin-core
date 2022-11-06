import { Body, UseGuards, Controller, Post, Get, Param, Delete, Put, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/createAdminDto';
import { UpdateAdminDto } from './dto/updateAdminDto';
import { Admin } from './entity/admin.entity';

@Controller('admin')
@ApiBearerAuth()
@ApiTags('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post()
    @UseGuards(JWTAuthGuard)
    @HttpCode(201)
    async createAdmin(@Body() adminDto: CreateAdminDto): Promise<Admin> {
        return this.adminService.createAdmin(adminDto);
    }

    @Get()
    @UseGuards(JWTAuthGuard)
    async getAllAdmin(): Promise<unknown> {
        return this.adminService.getAllAdmin();
    }

    @Get(':id')
    @UseGuards(JWTAuthGuard)
    async getAdmin(@Param('id') id: string): Promise<Admin> {
        return this.adminService.getAdmin(id);
    }

    @Put(':id')
    @UseGuards(JWTAuthGuard)
    async updateAdmin(@Body() adminDto: UpdateAdminDto, @Param('id') id: string): Promise<Admin> {
        return this.adminService.updateAdmin(id, adminDto);
    }

    @Delete(':id')
    @UseGuards(JWTAuthGuard)
    @HttpCode(204)
    async deleteAdmin(@Param('id') id: string): Promise<void> {
        await this.adminService.deleteAdmin(id);
    }
}
