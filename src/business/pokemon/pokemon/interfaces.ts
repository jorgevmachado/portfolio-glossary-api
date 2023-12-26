import { IBase } from '@base/interface';

import { type IMove } from '../move';
import { type IAbility } from '../ability';
import { type IStat } from '../stat';
import { type IType } from '../type';
import { type ISpecie } from '../specie';
import { type IForm } from '../form';

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
