import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        required: true,
        default: null,
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: [String],
        default: [],
    })
    options: string[];
}
