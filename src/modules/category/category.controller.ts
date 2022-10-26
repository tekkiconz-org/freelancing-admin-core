import { Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from './entity/category.entity';

@Controller('category')
@ApiBearerAuth()
@ApiTags('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    async getAllCategory(): Promise<Category[]> {
        return await this.categoryService.getAllCategory();
    }
}
