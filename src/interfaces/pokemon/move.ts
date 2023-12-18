import { type IBase } from '../base';
import { type IPokemonBase } from './pokemon';
import { type IResponseVersionGroupDetail } from './version-group-detail';

export interface IResponseMove {
	move: IPokemonBase;
	version_group_details: Array<IResponseVersionGroupDetail>;
}

export interface IMove extends IBase {
	id: string;
	pp?: number;
	url: string;
	name: string;
	type?: string;
	power?: number;
	target?: string;
	priority?: number;
	accuracy?: number;
}
