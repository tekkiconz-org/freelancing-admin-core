import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        @InjectRepository(User)
        private usersRepository: UserRepository,
    ) {}

    async validateUser(email: string, password: string): Promise<Partial<User>> {
        const user = await this.usersRepository.findOneBy({ email: email });
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new HttpException({ message: 'UnAuthorized' }, HttpStatus.FORBIDDEN);
        }
        return {
            id: user.id,
            email: user.email,
        };
    }

    async login(req: Request): Promise<any> {
        // console.log(req.body);
        const user = await this.usersRepository.findOneBy({ email: req.body.username });
        if (!user) {
            throw new HttpException({ message: 'test' }, HttpStatus.BAD_REQUEST);
        }
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            throw new HttpException({ message: 'Sai mk' }, HttpStatus.FORBIDDEN);
        }
        // const payload = { email: user.email, sub: user.userId };
        return user;
    }
}
