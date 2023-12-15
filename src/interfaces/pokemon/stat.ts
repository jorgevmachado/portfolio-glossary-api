import { IPokemon, IPokemonBase } from './pokemon';
import { IBase } from '../base';

export interface IResponseStat {
	base_stat: number;
	effort: number;
	stat: IPokemonBase;
}

export interface IStat extends IBase {
	id: string;
	url: string;
	name: string;
	effort: number;
	base_stat: number;
}
