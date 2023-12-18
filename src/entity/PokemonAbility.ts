import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { type IAbility } from '../interfaces/pokemon/ability';

@Entity('pokemons_ability')
export class PokemonAbility implements IAbility {

	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    is_hidden: boolean;

	@Column()
	    name: string;

	@Column()
	    slot: number;

	@Column()
	    url: string;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
