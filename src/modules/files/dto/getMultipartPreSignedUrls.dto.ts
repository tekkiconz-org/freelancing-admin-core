import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMultipartPreSignedUrlsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fileId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fileKey: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    parts: number;
}
