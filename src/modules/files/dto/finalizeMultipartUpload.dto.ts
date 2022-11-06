import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FinalizeMultipartUploadDto {
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
    parts: [];
}
