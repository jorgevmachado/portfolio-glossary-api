import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IType } from '@pokemon/type';


@Entity('pokemons_types')
export class PokemonTypes implements IType {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    name: string;

	@Column()
	    order: number;

	@Column()
	    textColor: string;

	@Column()
	    backgroundColor: string;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
