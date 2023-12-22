import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { type IForm } from '@pokemon/form';

@Entity('pokemons_forms')
export class PokemonForm implements IForm {
	@PrimaryGeneratedColumn('uuid')
	    id: string;

	@Column()
	    url: string;

	@Column()
	    name: string;

	@Column()
	    order: number;

	@Column()
	    is_mega: boolean;

	@Column()
	    is_default: boolean;

	@Column({ nullable: true })
	    back_shiny?: string;

	@Column({ nullable: true })
	    back_female?: string;

	@Column({ nullable: true })
	    front_shiny?: string;

	@Column({ nullable: true })
	    front_female?: string;

	@Column({ nullable: true })
	    back_default?: string;

	@Column({ nullable: true })
	    front_default?: string;

	@Column()
	    is_battle_only: boolean;

	@Column()
	    version_group_url: string;

	@Column({ nullable: true })
	    back_shiny_female?: string;

	@Column()
	    version_group_name: string;

	@Column({ nullable: true })
	    front_shiny_female?: string;

	@CreateDateColumn()
	    created_at: Date;

	@UpdateDateColumn()
	    updated_at?: Date;

	@DeleteDateColumn()
	    deleted_at?: Date;
}
