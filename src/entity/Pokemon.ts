import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { type IPokemon } from '@pokemon/pokemon';

import { PokemonForm } from '@entity/PokemonForm';

import { PokemonSpecies } from './PokemonSpecies';
import { PokemonStats } from './PokemonStats';
import { PokemonTypes } from './PokemonType';
import { PokemonAbility } from './PokemonAbility';
import { PokemonMove } from './PokemonMove';

@Entity('pokemons')
export class Pokemon implements IPokemon{
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    order: number;

	@Column()
	    url: string;

	@OneToOne(
	    () => PokemonForm,
	    { nullable: true }
	)
	@JoinColumn()
	    form: PokemonForm;


	@Column()
	    name: string;

	@ManyToMany(
	    () => PokemonStats,
	    { nullable: true }
	)
	@JoinTable()
	    stats: Array<PokemonStats>;

	@Column()
	    image: string;

	@ManyToMany(
	    () => PokemonMove,
	    { nullable: true }
	)
	@JoinTable()
	    moves: Array<PokemonMove>;

	@ManyToMany(
	    () => PokemonTypes,
	    { nullable: true }
	)
	@JoinTable()
	    types: Array<PokemonTypes>;

	@Column()
	    weight: number;

	@Column()
	    height: number;

	@OneToOne(
	    () => PokemonSpecies,
	    { nullable: true }
	)
	@JoinColumn()
	    specie: PokemonSpecies;

	@Column()
	    complete: boolean;

	@ManyToMany(
	    () => PokemonAbility,
	    { nullable: true }
	)
	@JoinTable()
	    abilities: Array<PokemonAbility>;

	@ManyToMany(
	    () => Pokemon,
	    { nullable: true }
	)
	@JoinTable()
	    evolutions: Array<Pokemon>;

	@Column()
	    base_experience: number;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
