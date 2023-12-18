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

import { PokemonSpecies } from './PokemonSpecies';
import { PokemonStats } from './PokemonStats';
import { PokemonTypes } from './PokemonType';
import { PokemonAbility } from './PokemonAbility';
import { PokemonMove } from './PokemonMove';

@Entity('pokemons')
export class Pokemon {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    order: number;

	@Column()
	    url: string;

	@Column()
	    name: string;

	@Column({
	    nullable: true
	})
	    image?: string;

	@Column({
	    nullable: true
	})
	    weight?: number;

	@Column({
	    nullable: true
	})
	    height?: number;

	@Column({
	    nullable: true
	})
	    base_experience?: number;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;

	@OneToOne( () => PokemonSpecies)
	@JoinColumn()
	    specie: PokemonSpecies;

	@ManyToMany(
	    () => PokemonStats,
	    { nullable: true }
	)
	@JoinTable()
	    stats: Array<PokemonStats>;

	@ManyToMany(
	    () => PokemonTypes,
	    { nullable: true }
	)
	@JoinTable()
	    types: Array<PokemonTypes>;

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

	@ManyToMany(
	    () => PokemonMove,
	    { nullable: true }
	)
	@JoinTable()
	    moves: Array<PokemonMove>;
}
