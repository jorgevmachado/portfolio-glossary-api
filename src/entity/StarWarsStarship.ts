import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { type IStarship } from '@starWars/starship';

@Entity('star_wars_starships')
export class StarWarsStarship implements IStarship {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    crew: string;

	@Column()
	    order: number;

	@Column()
	    MGLT: string;

	@Column()
	    name: string;

	@Column()
	    model: string;

	@Column()
	    length: string;

	@Column()
	    passengers: string;

	@Column()
	    consumables: string;

	@Column()
	    manufacturer: string;

	@Column()
	    starship_class: string;

	@Column()
	    cargo_capacity: string;

	@Column()
	    cost_in_credits: string;

	@Column()
	    hyperdrive_rating: string;

	@Column()
	    max_atmosphering_speed: string;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
