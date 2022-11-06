import { PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './createAdminDto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
