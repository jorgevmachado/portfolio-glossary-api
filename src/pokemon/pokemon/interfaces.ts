import { type IBase } from '@interfaces/base';
import { type IMove } from '@pokemon/move';
import { type IAbility } from '@pokemon/ability';
import { type IStat } from '@pokemon/stat';
import { type IType } from '@pokemon/type';
import { type ISpecie } from '@pokemon/specie';
import { type IForm } from '@pokemon/form';

export interface IPokemon extends IBase {
	order: number;
	url: string;
	form: IForm;
	name: string;
	stats: Array<IStat>;
	image: string;
	moves: Array<IMove>;
	types: Array<IType>;
	weight: number;
	height: number;
	specie: ISpecie;
	complete: boolean;
	abilities: Array<IAbility>;
	evolutions: Array<IPokemon>
	base_experience: number;
}
