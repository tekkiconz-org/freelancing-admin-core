import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../../auth/constants';
import { Role } from '../../roles/entity/role.entity';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Expose()
    email: string;

    @Column()
    @Expose()
    full_name: string;

    @Column()
    @Expose()
    password: string;

    @OneToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Column()
    @Expose()
    avatar_url: string;

    @Column()
    @Expose()
    facebook_id: string;

    @BeforeInsert()
    async actionBeforeInsert(): Promise<void> {
        this.password = await bcrypt.hash(this.password, jwtConstants.saltRound);
    }
}
