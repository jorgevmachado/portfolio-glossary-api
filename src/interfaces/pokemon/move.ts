import { IPokemonBase } from './pokemon';
import { IResponseVersionGroupDetail, IVersionGroupDetail } from './version-group-detail';
import { IBase } from '../base';

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
