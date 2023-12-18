import { type IPokemonBase } from './pokemon';

export interface IResponseEvolutions {
	baby_trigger_item: any;
	chain: {
		evolution_details: Array<any>;
		evolves_to: Array<{
				evolution_details: Array<{
						gender: any;
						held_item: any;
						item: any;
						known_move: any;
						known_move_type: any;
						location: any;
						min_affection: any;
						min_beauty: any;
						min_happiness: any;
						min_level: number;
						needs_overworld_rain: boolean;
						party_species: any;
						party_type: any;
						relative_physical_stats: any;
						time_of_day: string;
						trade_species: any;
						trigger: IPokemonBase;
						turn_upside_down: boolean;
					}>
				evolves_to: Array<{
						evolution_details: Array<
							{
								gender: any;
								held_item: any;
								item: any;
								known_move: any;
								known_move_type: any;
								location: any;
								min_affection: any;
								min_beauty: any;
								min_happiness: any;
								min_level: number;
								needs_overworld_rain: boolean;
								party_species: any;
								party_type: any;
								relative_physical_stats: any;
								time_of_day: string;
								trade_species: any;
								trigger: IPokemonBase;
								turn_upside_down: boolean;
							}>;
						evolves_to: Array<any>;
						is_baby: boolean;
						species: IPokemonBase;
					}>;
				is_baby: boolean;
				species: IPokemonBase;
			}
		>;
		is_baby: boolean;
		species: IPokemonBase;
	};
	id: number;
}
