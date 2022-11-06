import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from './entity/category.entity';
import { DeleteResult } from 'typeorm';
import { ExtraType, ExtraTypeEnum } from '../extraType/entity/extraType.entity';
import { ExtraTypeRepository } from '../extraType/repository/extraType.repository';

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository, private extraTypeRepository: ExtraTypeRepository) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { title, options } = createCategoryDto;
        if (options.length < 4) {
            throw new HttpException({ message: 'There should be more than 4 options' }, HttpStatus.BAD_REQUEST);
        }
        const metadata = JSON.stringify(options);

        const category = new Category();
        category.title = title;
        category.metadata = metadata;

        await this.categoryRepository.save(category);

        const defaultExtraType = new ExtraType();
        defaultExtraType.category = category;
        defaultExtraType.type = ExtraTypeEnum.LESS_TIME;

        this.extraTypeRepository.save(defaultExtraType);

        return category;
    }

    async getAllCategory(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async getCategory(id: string): Promise<Category> {
        const numberId = parseInt(id);
        if (!id) {
            throw new HttpException({ message: 'Category not found' }, HttpStatus.NOT_FOUND);
        }
        const category = this.categoryRepository.findOneBy({ id: numberId });
        if (!category) {
            throw new HttpException({ message: 'Category not found' }, HttpStatus.NOT_FOUND);
        }
        return category;
    }

    async deleteCategory(id: number): Promise<DeleteResult> {
        return await this.categoryRepository.delete({ id });
    }
}
