import { IPokemonBase } from './pokemon';
import { IBase } from '../base';

export interface IResponseType {
	slot: number;
	type: IPokemonBase;
}

export interface IType extends IBase {
	id: string;
	name: string;
	textColor: string;
	backgroundColor: string;
}
