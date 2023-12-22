import { IBase } from '@interfaces/base';

export interface ISpecie extends IBase {
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
	evolves_from_species_url?: string;
	evolves_from_species_name?: string;
	has_gender_differences: boolean;
}
