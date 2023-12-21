import { type IBase } from '@interfaces/base';
import { type ISpecie } from '@starWars/species';
import { type IVehicle } from '@starWars/vehicle';
import { type IPlanet } from '@starWars/planet';
import { type IStarship } from '@starWars/starship';

export interface IPerson extends IBase {
	url: string;
	mass: string;
	name: string;
	order: number;
	gender: string;
	height: string;
	species: Array<ISpecie>;
	vehicles: Array<IVehicle>;
	eye_color: string;
	homeworld?: IPlanet;
	starships: Array<IStarship>;
	hair_color: string;
	skin_color: string;
	birth_year: string;
}
