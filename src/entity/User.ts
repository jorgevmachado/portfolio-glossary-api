import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IUser } from '@business/auth/user';

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        name: string;

    @Column()
        admin: boolean;

    @Column()
        email: string;

    @Column({ nullable: true })
        phone?: string;

    @Column({ nullable: true })
        avatar?: string;

    @Column()
        mobile: string;

    @Column()
        password: string;

    @Column()
        birthday: Date;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at?: Date;

    @DeleteDateColumn()
        deleted_at?: Date;
}
