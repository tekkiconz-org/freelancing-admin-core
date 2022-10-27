import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryRepository.save(createCategoryDto);
    }
    async getAllCategory(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }
}
