import { ISpecie } from './species';
import { IAbility, IResponseAbility } from './ability';
import { IGameIndex, IResponseGameIndex } from './game-index';
import { IMove, IResponseMove } from './move';
import { IResponseStat, IStat } from './stat';
import { IType } from './type';
import { IBase } from '../base';

export interface IPokemonBase {
	name: string;
	url: string;
}

export interface IResponsePokemonBase {
	count: number;
	next: string;
	previous: string;
	results: Array<IPokemonBase>;
}
export interface IResponsePokemon {
	id: number;
	name: string;
	sprites: {
		back_default: string;
		back_female: string;
		back_shiny: string;
		back_shiny_female: string;
		front_default: string;
		front_female: string;
		front_shiny: string;
		front_shiny_female: string;
		other: {
			dream_world: {
				front_default: string;
				front_female: any;
			},
			home: {
				front_default: string;
				front_female: string;
				front_shiny: string;
				front_shiny_female: string;
			},
			'official-artwork': {
				front_default: string;
				front_shiny: string;
			}
		},
		versions: {
			'generation-i': {
				'red-blue': {
					back_default: string;
					back_gray: string;
					back_transparent: string;
					front_default: string;
					front_gray: string;
					front_transparent: string;
				},
				yellow: {
					back_default: string;
					back_gray: string;
					back_transparent: string;
					front_default: string;
					front_gray: string;
					front_transparent: string;
				}
			},
			'generation-ii': {
				crystal: {
					back_default: string;
					back_shiny: string;
					back_shiny_transparent: string;
					back_transparent: string;
					front_default: string;
					front_shiny: string;
					front_shiny_transparent: string;
					front_transparent: string;
				},
				gold: {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
					'front_transparent': string;
				},
				silver: {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
					'front_transparent': string;
				}
			},
			'generation-iii': {
				emerald: {
					front_default: string;
					front_shiny: string;
				},
				'firered-leafgreen': {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
				},
				'ruby-sapphire': {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
				}
			},
			'generation-iv': {
				'diamond-pearl': {
					back_default: string;
					back_female: string;
					back_shiny: string;
					back_shiny_female: string;
					front_default: string;
					'front_female': string;
					front_shiny: string;
					front_shiny_female: string;
				},
				'heartgold-soulsilver': {
					back_default: string;
					back_female: string;
					back_shiny: string;
					back_shiny_female: string;
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				},
				platinum: {
					back_default: string;
					back_female: string;
					back_shiny: string;
					back_shiny_female: string;
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				}
			},
			'generation-v': {
				'black-white': {
					animated: {
						back_default: string;
						back_female: string;
						back_shiny: string;
						back_shiny_female: string;
						front_default: string;
						front_female: string;
						front_shiny: string;
						front_shiny_female: string;
					},
					back_default: string;
					back_female: string;
					back_shiny: string;
					back_shiny_female: string;
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				}
			},
			'generation-vi': {
				'omegaruby-alphasapphire': {
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				},
				'x-y': {
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				}
			},
			'generation-vii': {
				icons: {
					front_default: string;
					front_female: any;
				},
				'ultra-sun-ultra-moon': {
					front_default: string;
					front_female: string;
					front_shiny: string;
					'front_shiny_female': string;
				}
			},
			'generation-viii': {
				icons: {
					front_default: string;
					front_female: any;
				}
			}
		}
	},
	types: Array<{
		slot: number;
		type: IPokemonBase;
	}>;
	abilities: IResponseAbility[];
	base_experience: number;
	game_indices: Array<IResponseGameIndex>;
	moves: Array<IResponseMove>;
	species: ISpecie;
	url: string;
	stats: Array<IResponseStat>;
	weight: number;
	height: number;
}

export interface IPokemon extends IBase {
	id: string;
	url: string;
	name: string;
	order: number;
	stats?: Array<IStat>;
	image?: string;
	moves?: Array<IMove>;
	types?: Array<IType>;
	weight?: number;
	height?: number;
	specie: ISpecie;
	abilities?: Array<IAbility>;
	evolutions?: Array<IPokemon>
	base_experience?: number;
}
