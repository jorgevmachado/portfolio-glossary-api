import { type IBase } from '@interfaces/base';

export interface IStarship extends IBase {
	url: string;
	crew: string;
	order: number;
	MGLT: string;
	name: string;
	model: string;
	length: string;
	passengers: string;
	consumables: string;
	manufacturer: string;
	starship_class: string;
	cargo_capacity: string;
	cost_in_credits: string;
	hyperdrive_rating: string;
	max_atmosphering_speed: string;
}
