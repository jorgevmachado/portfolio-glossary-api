import { type IResponseFilm } from '@api/starWars';
import { generateOrder } from '@services/string';

import { StarWarsFilm } from '@entity/StarWarsFilm';
import { StarWarsNationality } from '@entity/starWarsNationality';
import { StarWarsPlanet } from '@entity/StarWarsPlanet';
import { StarWarsVehicle } from '@entity/StarWarsVehicle';
import { StarWarsStarship } from '@entity/StarWarsStarship';
import { StarWarsPerson } from '@entity/StarWarsPerson';

import { type IFilm } from './interfaces';

interface IEntities {
	nationalities: Array<StarWarsNationality>;
	planets: Array<StarWarsPlanet>;
	vehicles: Array<StarWarsVehicle>;
	starships: Array<StarWarsStarship>;
	characters: Array<StarWarsPerson>;
}

interface IResponseToEntity extends IEntities{
	response: IResponseFilm;
}
export default class FilmMapper {

    static urlDefault = 'https://swapi.dev/api/films/';

    static defaultInterface(): IFilm {
        return {
            id: 'film',
	        url: '',
	        order: 0,
	        title: '',
	        nationalities: [],
	        planets: [],
	        producer: '',
	        director: '',
	        vehicles: [],
	        starships: [],
	        characters: [],
	        episode: 0,
	        release_date: '',
	        opening_crawl: '',
	        created_at: new Date(),
        };
    }

    static responseToInterface({ response, planets = [], nationalities = [], starships = [], vehicles = [], characters = []}: IResponseToEntity): IFilm {
        const iEntity = FilmMapper.defaultInterface();
	    iEntity.url = response.url;
	    iEntity.order = generateOrder(response.url, FilmMapper.urlDefault);
        iEntity.title = response.title;
        iEntity.nationalities = nationalities;
        iEntity.planets = planets;
	    iEntity.producer = response.producer;
	    iEntity.director = response.director;
	    iEntity.vehicles = vehicles;
	    iEntity.starships = starships;
	    iEntity.characters = characters;
	    iEntity.episode = response.episode_id;
	    iEntity.release_date = response.release_date;
	    iEntity.opening_crawl = response.opening_crawl;
        return iEntity;
    }

    static interfaceToEntity(iEntity: IFilm): StarWarsFilm {
        const entity = new StarWarsFilm();
	    entity.url = iEntity.url;
	    entity.order = iEntity.order;
	    entity.title = iEntity.title;
	    entity.nationalities = iEntity.nationalities;
	    entity.planets = iEntity.planets;
	    entity.producer = iEntity.producer;
	    entity.director = iEntity.director;
	    entity.vehicles = iEntity.vehicles;
	    entity.starships = iEntity.starships;
	    entity.characters = iEntity.characters;
	    entity.episode = iEntity.episode;
	    entity.release_date = iEntity.release_date;
	    entity.opening_crawl = iEntity.opening_crawl;
        entity.created_at = iEntity.created_at;
        return entity;
    }
}
