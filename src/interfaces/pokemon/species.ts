import {IPokemonBase} from "./pokemon";
import { IBase } from '../base';
interface IFavorTextEntries {
	flavor_text: string;
	language: IPokemonBase;
	version: IPokemonBase;
}
interface IGenera {
	genus: string;
	language: IPokemonBase;
}
interface INames {
	language: IPokemonBase;
	name: string;
}
interface IPalParkEncounters  {
	area: IPokemonBase;
	base_score: number;
	rate: number;
}
interface IPokedexNumbers {
	entry_number: number;
	pokedex: IPokemonBase;
}
interface IVarieties {
	is_default: boolean;
	pokemon: IPokemonBase;
}
export interface IResponseSpecies {
	id?: number;
	url: string;
	name: string;
	order?: number;
	shape?: IPokemonBase;
	names?: INames[];
	color?: IPokemonBase;
	genera?: IGenera[];
	is_baby?: boolean;
	varieties?: IVarieties[];
	generation?: IPokemonBase;
	egg_groups?: IPokemonBase[];
	is_mythical?: boolean;
	gender_rate?: number;
	is_legendary?: boolean;
	capture_rate?: number;
	base_happiness?: number;
	evolution_chain: {
		url: string;
	},
	forms_switchable?: boolean;
	form_descriptions?: [];
	flavor_text_entries?: IFavorTextEntries[];
	evolves_from_species?: IPokemonBase;
	habitat?: IPokemonBase;
	growth_rate?: IPokemonBase;
	hatch_counter?: number;
	pokedex_numbers?: IPokedexNumbers[];
	pal_park_encounters?: IPalParkEncounters[];
	has_gender_differences?: boolean;
}

export interface ISpecie extends IBase {
	id: string;
	url: string;
	name: string;
	order: number;
	is_baby: boolean;
	shape_url: string;
	color_url: string;
	shape_name: string;
	color_name: string;
	is_mythical: boolean;
	habitat_url: string;
	gender_rate: number;
	habitat_name: string;
	is_legendary: boolean;
	capture_rate: number;
	hatch_counter: number;
	base_happiness: number;
	generation_url: string;
	generation_name: string;
	growth_rate_url: string;
	growth_rate_name: string;
	forms_switchable: boolean;
	evolution_chain_url: string;
	evolves_from_species_url: string;
	evolves_from_species_name: string;
	has_gender_differences: boolean;
}
