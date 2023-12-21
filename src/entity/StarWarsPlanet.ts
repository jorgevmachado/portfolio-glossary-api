import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { type IPlanet } from '@starWars/planet';

import { StarWarsPerson } from '@entity/StarWarsPerson';


@Entity('star_wars_planets')
export class StarWarsPlanet implements IPlanet {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    name: string;

	@Column()
	    order: number;

	@Column()
	    terrain: string;

	@Column()
	    climate: string;

	@Column()
	    gravity: string;

	@Column()
	    diameter: string;

	@ManyToOne(() => StarWarsPerson, (residents) => residents.homeworld, {nullable: true})
	@JoinColumn()
	    residents?: Array<StarWarsPerson>;

	@Column()
	    population: string;

	@Column()
	    surface_water: string;

	@Column()
	    orbital_period: string;

	@Column()
	    rotation_period: string;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
