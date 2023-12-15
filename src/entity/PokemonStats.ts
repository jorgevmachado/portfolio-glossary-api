import { IStat } from '../interfaces/pokemon/stat';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('pokemons_stats')
export class PokemonStats implements IStat {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	url: string;

	@Column()
	name: string;

	@Column()
	effort: number;

	@Column()
	base_stat: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at?: Date;

	@DeleteDateColumn()
	deleted_at?: Date;
}
