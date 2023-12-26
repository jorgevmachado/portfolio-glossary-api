import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { type IFilm } from '@business/starWars';

import { StarWarsNationality } from '@entity/starWarsNationality';
import { StarWarsPlanet } from '@entity/StarWarsPlanet';
import { StarWarsVehicle } from '@entity/StarWarsVehicle';
import { StarWarsStarship } from '@entity/StarWarsStarship';
import { StarWarsPerson } from '@entity/StarWarsPerson';

@Entity('star_wars_films')
export class StarWarsFilm implements IFilm {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    order: number;

	@Column()
	    title: string;

	@ManyToMany(() => StarWarsNationality)
	@JoinTable()
	    nationalities: Array<StarWarsNationality>;

	@ManyToMany(() => StarWarsPlanet)
	@JoinTable()
	    planets: Array<StarWarsPlanet>;

	@Column()
	    producer: string;

	@Column()
	    director: string;


	@ManyToMany(() => StarWarsVehicle)
	@JoinTable()
	    vehicles: Array<StarWarsVehicle>;


	@ManyToMany(() => StarWarsStarship)
	@JoinTable()
	    starships: Array<StarWarsStarship>;

	@ManyToMany(() => StarWarsPerson)
	@JoinTable()
	    characters: Array<StarWarsPerson>;

	@Column()
	    episode: number;

	@Column()
	    release_date: string;

	@Column()
	    opening_crawl: string;


	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
