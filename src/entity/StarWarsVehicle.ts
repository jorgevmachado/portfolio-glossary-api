import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { type IVehicle } from '@business/starWars';

@Entity('star_wars_vehicles')
export class StarWarsVehicle implements IVehicle {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    crew: string;

	@Column()
	    order: number;

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
	    vehicle_class: string;

	@Column()
	    cargo_capacity: string;

	@Column()
	    cost_in_credits: string;

	@Column()
	    max_atmosphering_speed: string;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
