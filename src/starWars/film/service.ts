import { type IFilm } from '@starWars/film/interfaces';
import { BaseService } from '@base/baseService';
import FilmRepository from '@starWars/film/repository';
import { StarWars } from '@api/starWars';
import FilmMapper from '@starWars/film/mapper';
import PlanetMapper from '@starWars/planet/mapper';
import SpecieMapper from '@starWars/species/mapper';
import StarshipMapper from '@starWars/starship/mapper';
import VehicleMapper from '@starWars/vehicle/mapper';
import PersonMapper from '@starWars/person/mapper';
import { generateListOrder } from '@services/string';

import { StarWarsPerson } from '@entity/StarWarsPerson';
import { StarWarsVehicle } from '@entity/StarWarsVehicle';
import { StarWarsStarship } from '@entity/StarWarsStarship';
import { StarWarsSpecies } from '@entity/starWarsSpecies';
import { StarWarsPlanet } from '@entity/StarWarsPlanet';
import { StarWarsFilms } from '@entity/StarWarsFilms';

interface IGenerate {
    planets: Array<StarWarsPlanet>;
    species: Array<StarWarsSpecies>;
    starships: Array<StarWarsStarship>;
    vehicles: Array<StarWarsVehicle>;
    characters: Array<StarWarsPerson>;
}
export class FilmService extends BaseService<StarWarsFilms, IFilm> {
    constructor() {
        const repository = new FilmRepository();
        super(repository);
    }

    async generate({ planets, species, starships, vehicles, characters}: IGenerate): Promise<Array<StarWarsFilms> | undefined> {
        const result = await this.repository.index();
        if(result.length) {
            return result;
        }
        const list = await this.generateAll();
        if(!list) {
            return;
        }
        const listInterface = list.results.map((response) => {
            const planetsList = this.filterPlanetList(response.planets, planets);
            const speciesList = this.filterSpeciesList(response.species, species);
            const starshipsList = this.filterStarshipsList(response.starships, starships);
            const vehiclesList = this.filterVehiclesList(response.vehicles, vehicles);
            const charactersList = this.filterCharacterList(response.characters, characters);
            return FilmMapper.responseToInterface({
                response,
                planets: planetsList,
                species: speciesList,
                starships: starshipsList,
                vehicles: vehiclesList,
                characters: charactersList,
            });
        });

        const listEntities = await this.repository.initializeDatabases(listInterface);
        if(!listEntities) {
            return;
        }

        const filteredListEntities:Array<StarWarsFilms> = listEntities.filter((item) => item !== undefined) as Array<StarWarsFilms>;
        if(!filteredListEntities) {
            return [];
        }

        return filteredListEntities;
    }

    private async generateAll() {
        const responses = new StarWars();
        const response = await responses.getFilms();
        if(!response) {
            return;
        }
        return response;
    }

    private filterPlanetList(planets: Array<string>, planetList: Array<StarWarsPlanet>): Array<StarWarsPlanet> {
        const order = generateListOrder(planets, PlanetMapper.urlDefault);
        if(!order) {
            return [];
        }
        return planetList.filter((item) => order.includes(item.order));
    }

    private filterSpeciesList(species: Array<string>, speciesList: Array<StarWarsSpecies>): Array<StarWarsSpecies> {
        const orders = generateListOrder(species, SpecieMapper.urlDefault);
        if(!orders) {
            return [];
        }
        return speciesList.filter((specie) => orders.includes(specie.order));
    }

    private filterStarshipsList(starships: Array<string>, starshipsList: Array<StarWarsStarship>): Array<StarWarsStarship> {
        const orders = generateListOrder(starships, StarshipMapper.urlDefault);
        if(!orders) {
            return [];
        }
        return starshipsList.filter((starship) => orders.includes(starship.order));
    }

    private filterVehiclesList(vehicles: Array<string>, vehiclesList: Array<StarWarsVehicle>): Array<StarWarsVehicle> {
        const orders = generateListOrder(vehicles, VehicleMapper.urlDefault);
        if(!orders) {
            return [];
        }
        return vehiclesList.filter((vehicle) => orders.includes(vehicle.order));
    }

    private filterCharacterList(character: Array<string>, characterList: Array<StarWarsPerson>): Array<StarWarsPerson> {
        const orders = generateListOrder(character, PersonMapper.urlDefault);
        if(!orders) {
            return [];
        }
        return characterList.filter((character) => orders.includes(character.order));
    }
}
