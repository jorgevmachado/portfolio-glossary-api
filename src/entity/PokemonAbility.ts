import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IAbility } from '@pokemon/ability';

@Entity('pokemons_ability')
export class PokemonAbility implements IAbility {

	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    name: string;

	@Column()
	    slot: number;

	@Column()
	    is_hidden: boolean;

	@Column()
	    order: number;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
