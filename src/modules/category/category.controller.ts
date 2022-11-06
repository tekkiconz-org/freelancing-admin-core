import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from './entity/category.entity';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('category')
@ApiBearerAuth()
@ApiTags('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    @UseGuards(JWTAuthGuard)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    @UseGuards(JWTAuthGuard)
    async getAllCategory(): Promise<Category[]> {
        return await this.categoryService.getAllCategory();
    }

    @Get(':id')
    @UseGuards(JWTAuthGuard)
    async getCategory(@Param('id') id: string): Promise<Category> {
        return this.categoryService.getCategory(id);
    }

    @Delete('/:id')
    @UseGuards(JWTAuthGuard)
    @HttpCode(204)
    async deleteCategory(@Param() id: number): Promise<void> {
        await this.categoryService.deleteCategory(id);
    }
}
