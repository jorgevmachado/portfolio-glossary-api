import { type IBase } from '../base';
import { type IPokemonBase } from './pokemon';


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
