import { type IBase } from '@interfaces/base';

export interface IVehicle extends IBase {
	url: string;
	crew: string;
	name: string;
	model: string;
	order: number;
	length: string;
	passengers: string;
	consumables: string;
	manufacturer: string;
	vehicle_class: string;
	cargo_capacity: string;
	cost_in_credits: string;
	max_atmosphering_speed: string;
}
