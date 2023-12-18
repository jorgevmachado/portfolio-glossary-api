import { type IBase } from '../base';
import { type IPokemonBase } from './pokemon';

export interface IResponseGameIndex {
	version: IPokemonBase;
	game_index: number;
}

export interface IGameIndex extends IBase {
	id: string;
	game_index: number;
	version_url: string;
	version_name: string;
}
