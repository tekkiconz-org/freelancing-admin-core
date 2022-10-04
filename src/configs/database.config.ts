import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { User } from '../modules/users/entity/user.entity';
import { ConfigSetting } from '../modules/configSetting/entity/configSetting.entity';
import { Country } from '../modules/countries/entity/country.entity';
import { Director } from '../modules/directors/entity/director.entity';
import { FilmZone } from '../modules/filmZone/entity/filmZone.entity';
import { Film } from '../modules/film/entity/film.entity';
import { FilmGroup } from '../modules/filmGroup/entity/filmGroup.entity';
import { Genre } from '../modules/genre/entity/genre.entity';
import { Role } from '../modules/roles/entity/role.entity';
import { Cast } from '../modules/casts/entity/cast.entity';

export const defaultConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'vvideo',
    // autoLoadEntities: true,
    entities: [Role, ConfigSetting, Country, Director, Cast, Film, FilmZone, Genre, FilmGroup, User],
    synchronize: true,
    logging: true,
    dropSchema: true,
};
