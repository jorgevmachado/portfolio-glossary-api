import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { type IMove } from '../interfaces/pokemon/move';

@Entity('pokemons_moves')
export class PokemonMove implements IMove {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column({
	    nullable: true
	})
	    pp?: number;

	@Column()
	    url: string;

	@Column()
	    name: string;

	@Column({
	    nullable: true
	})
	    type?: string;

	@Column({
	    nullable: true
	})
	    power?: number;

	@Column({
	    nullable: true
	})
	    target?: string;

	@Column({
	    nullable: true
	})
	    priority?: number;

	@Column({
	    nullable: true
	})
	    accuracy?: number;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
