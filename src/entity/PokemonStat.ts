import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { type IStat } from '@business/pokemon';
@Entity('pokemons_stats')
export class PokemonStat implements IStat {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    name: string;

	@Column()
	    order: number;

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
