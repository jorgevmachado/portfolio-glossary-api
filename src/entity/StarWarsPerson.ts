import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { type IPerson } from '@business/starWars';

import { StarWarsVehicle } from '@entity/StarWarsVehicle';
import { StarWarsPlanet } from '@entity/StarWarsPlanet';
import { StarWarsNationality } from '@entity/starWarsNationality';
import { StarWarsStarship } from '@entity/StarWarsStarship';

@Entity('star_wars_people')
export class StarWarsPerson implements IPerson{
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    mass: string;

	@Column()
	    name: string;

	@Column()
	    image: string;

	@Column()
	    order: number;

	@Column()
	    gender: string;

	@Column()
	    height: string;


	@ManyToMany(() => StarWarsNationality)
	@JoinTable()
	    nationalities: Array<StarWarsNationality>;

	@ManyToMany(() => StarWarsVehicle)
	@JoinTable()
	    vehicles: Array<StarWarsVehicle>;

	@Column()
	    eye_color: string;

	@ManyToOne(() => StarWarsPlanet, (homeworld) => homeworld.residents, { nullable: true })
	@JoinColumn()
	    homeworld?: StarWarsPlanet;


	@ManyToMany(() => StarWarsStarship)
	@JoinTable()
	    starships: Array<StarWarsStarship>;

	@Column()
	    hair_color: string;

	@Column()
	    skin_color: string;

	@Column()
	    birth_year: string;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
