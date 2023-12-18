import { type IBase } from '../base';
import { type IPokemonBase } from './pokemon';

export interface IResponseAbility {
	ability: IPokemonBase,
	is_hidden: boolean;
	slot: number;
}

export interface IAbility extends IBase{
	id: string;
	url: string;
	name: string;
	slot: number;
	is_hidden: boolean;
}
