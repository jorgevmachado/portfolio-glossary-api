import { type IBase } from '@interfaces/base';
import { type IPerson } from '@starWars/person';

export interface IPlanet extends IBase {
	url: string;
	name: string;
	order: number;
	terrain: string;
	climate: string;
	gravity: string;
	diameter: string;
	residents?: Array<IPerson>;
	population: string;
	surface_water: string;
	orbital_period: string;
	rotation_period: string;
}
