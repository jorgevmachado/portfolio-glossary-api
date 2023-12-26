import {
    FilmService,
    NationalityService,
    PersonService,
    PlanetService,
    StarshipService,
    VehicleService
} from '@business/starWars';

import { StarWarsPlanet } from '@entity/StarWarsPlanet';
import { StarWarsNationality } from '@entity/starWarsNationality';
import { StarWarsStarship } from '@entity/StarWarsStarship';
import { StarWarsVehicle } from '@entity/StarWarsVehicle';
import { StarWarsPerson } from '@entity/StarWarsPerson';
import { StarWarsFilm } from '@entity/StarWarsFilm';

export interface IGeneratePersonProps {
	planets: Array<StarWarsPlanet>;
	vehicles: Array<StarWarsVehicle>;
	starships: Array<StarWarsStarship>;
	nationalities: Array<StarWarsNationality>;
}

export interface IGenerateFilmProps extends IGeneratePersonProps {
	characters: Array<StarWarsPerson>;
}

export interface IGenerate {
	films: string;
	characters: string;
	planets: string;
	nationalities: string;
	vehicles: string;
	starships: string;
}

export interface IResult<T> {
	entity: T;
	message: string;
}
export class StarWarsService {

    public async generate(): Promise<IGenerate> {
        const planets = await this.generatePlanet();
        const nationalities = await this.generateNationalities();
        const starships = await this.generateStarships();
        const vehicles = await this.generateVehicles();
        const characters = await this.generateCharacters({
            planets: planets.entity,
	        vehicles: vehicles.entity,
            starships: starships.entity,
	        nationalities: nationalities.entity,
        });
        const films = await this.generateFilms({
            planets: planets.entity,
            vehicles: vehicles.entity,
            starships: starships.entity,
            characters: characters.entity,
            nationalities: nationalities.entity,
        });
        return {
	        films: films.message,
	        characters: characters.message,
	        planets: planets.message,
	        vehicles: vehicles.message,
	        starships: starships.message,
	        nationalities: nationalities.message,
        };
    }
    private async generatePlanet(): Promise<IResult<Array<StarWarsPlanet>>> {
        const service = new PlanetService();
        const result: IResult<Array<StarWarsPlanet>> = {
            message: 'Error generating planets!',
            entity: [],
        };
        const planets = await service.generate();
        if(!planets) {
            return result;
        }
        result.entity = planets;
        result.message = 'List of successfully generated planets!';
        return result;
    }

    private async generateNationalities(): Promise<IResult<Array<StarWarsNationality>>> {
        const service = new NationalityService();
        const result: IResult<Array<StarWarsNationality>> = {
            message: 'Error generating nationalities!',
            entity: [],
        };
        const nationalities = await service.generate();
        if(!nationalities) {
            return result;
        }
        result.entity = nationalities;
        result.message = 'List of Nationalities generated successfully!';
        return result;
    }

    private async generateStarships(): Promise<IResult<Array<StarWarsStarship>>> {
        const service = new StarshipService();
        const result: IResult<Array<StarWarsStarship>> = {
            message: 'Error generating starships!',
            entity: [],
        };
        const starships = await service.generate();
		 if(!starships) {
			 return result;
		 }
		 result.entity = starships;
		 result.message = 'List of successfully generated starships!';
		 return result;
    }

    private async generateVehicles(): Promise<IResult<Array<StarWarsVehicle>>> {
        const service = new VehicleService();
        const result: IResult<Array<StarWarsVehicle>> = {
            message: 'Error generating vehicles!',
            entity: [],
        };
        const vehicles = await service.generate();
        if(!vehicles) {
            return result;
        }
        result.entity = vehicles;
        result.message = 'List of successfully generated vehicles!';
        return result;
    }

    private  async generateCharacters({ planets, nationalities, starships, vehicles}: IGeneratePersonProps): Promise<IResult<Array<StarWarsPerson>>> {
        const service = new PersonService();
        const result: IResult<Array<StarWarsPerson>> = {
            message: 'Error generating characters!',
            entity: [],
	    };
        if(planets.length === 0 && nationalities.length === 0 && starships.length === 0 && vehicles.length === 0) {
            return result;
        }
        const characters = await service.generate({ planets, nationalities, starships, vehicles});
        if(!characters) {
            return result;
        }
        result.entity = characters;
        result.message = 'List of successfully generated characters!';
        return result;
    }

    private  async generateFilms({ planets, nationalities, starships, vehicles, characters}: IGenerateFilmProps): Promise<IResult<Array<StarWarsFilm>>> {
        const service = new FilmService();
        const result: IResult<Array<StarWarsFilm>> = {
            message: 'Error generating films!',
            entity: [],
        };
	    if(planets.length === 0 && nationalities.length === 0 && starships.length === 0 && vehicles.length === 0 && characters.length === 0) {
		    return result;
	    }
        const films = await service.generate({ planets, nationalities, starships, vehicles, characters});
        if(!films) {
            return result;
        }
        result.message = 'List of successfully generated films!';
        result.entity = films;
        return result;
    }
}
