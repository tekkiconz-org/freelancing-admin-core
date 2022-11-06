import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Category } from '../../category/entity/category.entity';

export enum ExtraTypeEnum {
    LESS_TIME,
    OTHER,
}

@Entity({
    name: 'extra_type',
})
export class ExtraType {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    @Expose()
    category: Category;

    @Column({
        type: 'enum',
        enum: ExtraTypeEnum,
    })
    @Expose()
    type: ExtraTypeEnum;

    @Column()
    @Expose()
    title: string;
}
