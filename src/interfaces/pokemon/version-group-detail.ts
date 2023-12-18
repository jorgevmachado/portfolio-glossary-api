import { type IBase } from '../base';
import { type IPokemonBase } from './pokemon';

export interface IResponseVersionGroupDetail {
	version_group: IPokemonBase;
	level_learned_at: number;
	move_learn_method: IPokemonBase;
}

export interface IVersionGroupDetail extends IBase {
	id: string;
	level_learned_at: number;
	version_group_url: string;
	version_group_name: string;
	move_learn_method_name: string;
	move_learn_method_url: string;
}
