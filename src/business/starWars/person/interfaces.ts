import { type IBase } from '@base/interface';

import { type INationality } from '../nationality';
import { type IVehicle } from '../vehicle';
import { type IPlanet } from '../planet';
import { type IStarship } from '../starship';

export interface IPerson extends IBase {
	url: string;
	mass: string;
	name: string;
	order: number;
	gender: string;
	height: string;
	nationalities: Array<INationality>;
	vehicles: Array<IVehicle>;
	eye_color: string;
	homeworld?: IPlanet;
	starships: Array<IStarship>;
	hair_color: string;
	skin_color: string;
	birth_year: string;
}
