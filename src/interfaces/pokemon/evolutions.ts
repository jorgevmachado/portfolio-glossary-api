import { type IPokemonBase } from './pokemon';

export interface  IResponseEvolutionDetail {
	gender: string;
	held_item: string;
	item: string;
	known_move: string;
	known_move_type: string;
	location: string;
	min_affection: string;
	min_beauty: string;
	min_happiness: string;
	min_level: number;
	needs_overworld_rain: boolean;
	party_species: string;
	party_type: string;
	relative_physical_stats: string;
	time_of_day: string;
	trade_species: string;
	trigger: IPokemonBase;
	turn_upside_down: boolean;
}

export interface IEvolvesTo {
	evolution_details: Array<IResponseEvolutionDetail>;
	evolves_to: Array<IEvolvesTo>;
	is_baby: boolean;
	species: IPokemonBase;
}
export interface IResponseEvolutions {
	baby_trigger_item: string;
	chain: {
		evolution_details: Array<string>;
		evolves_to: Array<{
				evolution_details: Array<IResponseEvolutionDetail>
				evolves_to: Array<IEvolvesTo>;
				is_baby: boolean;
				species: IPokemonBase;
			}
		>;
		is_baby: boolean;
		species: IPokemonBase;
	};
	id: number;
}
