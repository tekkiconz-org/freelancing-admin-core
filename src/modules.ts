import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import ormConfig from './ormconfig';

const Modules = [AuthModule, AdminModule, CategoryModule, TypeOrmModule.forRootAsync({ useFactory: ormConfig })];
export default Modules;
