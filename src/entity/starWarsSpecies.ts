
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { type ISpecie } from '@starWars/species';

@Entity('star_wars_species')
export class StarWarsSpecies implements ISpecie {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    name: string;

	@Column()
	    order: number;

	@Column()
	    language: string;

	@Column()
	    eye_colors: string;

	@Column()
	    designation: string;

	@Column()
	    skin_colors: string;

	@Column()
	    hair_colors: string;

	@Column()
	    classification: string;

	@Column()
	    average_height: string;

	@Column()
	    average_lifespan: string;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
