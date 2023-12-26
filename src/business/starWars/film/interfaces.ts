import { type IBase } from '@base/interface';

import { type INationality } from '../nationality';
import { type IPlanet } from '../planet';
import { type IVehicle } from '../vehicle';
import { type IStarship } from '../starship';
import { type IPerson } from '../person';

export interface IFilm extends IBase {
	url: string;
	order: number;
	title: string;
	nationalities: Array<INationality>;
	planets: Array<IPlanet>;
	producer: string;
	director: string;
	vehicles: Array<IVehicle>;
	starships: Array<IStarship>;
	characters: Array<IPerson>;
	episode: number;
	release_date: string;
	opening_crawl: string;
}
