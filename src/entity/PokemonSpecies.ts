import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { type ISpecie } from '@interfaces/pokemon/species';

@Entity('pokemons_species')
export class PokemonSpecies implements ISpecie {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    name: string;

	@Column()
	    order: number;

	@Column()
	    is_baby: boolean;

	@Column()
	    shape_url: string;

	@Column()
	    color_url: string;

	@Column()
	    shape_name: string;

	@Column()
	    color_name: string;

	@Column()
	    is_mythical: boolean;

	@Column()
	    habitat_url: string;

	@Column()
	    gender_rate: number;

	@Column()
	    habitat_name: string;

	@Column()
	    is_legendary: boolean;

	@Column()
	    capture_rate: number;

	@Column()
	    hatch_counter: number;

	@Column()
	    base_happiness: number;

	@Column()
	    generation_url: string;

	@Column()
	    generation_name: string;

	@Column()
	    growth_rate_url: string;

	@Column()
	    growth_rate_name: string;

	@Column()
	    forms_switchable: boolean;

	@Column()
	    evolution_chain_url: string;

	@Column()
	    evolves_from_species_url: string;

	@Column()
	    evolves_from_species_name: string;

	@Column()
	    has_gender_differences: boolean;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
