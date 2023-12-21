import { type IBase } from '@interfaces/base';
import { type ISpecie } from '@starWars/species';
import { type IPlanet } from '@starWars/planet';
import { type IVehicle } from '@starWars/vehicle';
import { type IStarship } from '@starWars/starship';
import { type IPerson } from '@starWars/person';

export interface IFilm extends IBase {
	url: string;
	order: number;
	title: string;
	species: Array<ISpecie>;
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
