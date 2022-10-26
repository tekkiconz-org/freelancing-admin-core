import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity({
    name: 'category',
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Expose()
    parent_id: string;

    @Column()
    @Expose()
    title: string;

    @Column()
    @Expose()
    metadata: string;
}
