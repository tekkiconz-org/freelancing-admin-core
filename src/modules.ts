import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import ormConfig from './ormconfig';
import { FilesModule } from './modules/files/files.module';

const Modules = [
    AuthModule,
    FilesModule,
    AdminModule,
    CategoryModule,
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
];
export default Modules;
