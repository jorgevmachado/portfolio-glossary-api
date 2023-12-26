import { StarWars } from '@api/starWars';
import { generateListOrder } from '@services/string';
import SpecieMapper from '@business/starWars/nationality/mapper';
import { BaseService } from '@base/service';

import { StarWarsPerson } from '@entity/StarWarsPerson';
import { StarWarsVehicle } from '@entity/StarWarsVehicle';
import { StarWarsStarship } from '@entity/StarWarsStarship';
import { StarWarsNationality } from '@entity/starWarsNationality';
import { StarWarsPlanet } from '@entity/StarWarsPlanet';
import { StarWarsFilm } from '@entity/StarWarsFilm';

import PersonMapper from '../person/mapper';
import VehicleMapper from '../vehicle/mapper';
import StarshipMapper from '../starship/mapper';
import PlanetMapper from '../planet/mapper';
import FilmMapper from './mapper';
import FilmRepository from './repository';
import { type IFilm } from './interfaces';

interface IGenerate {
    planets: Array<StarWarsPlanet>;
    vehicles: Array<StarWarsVehicle>;
    starships: Array<StarWarsStarship>;
    characters: Array<StarWarsPerson>;
    nationalities: Array<StarWarsNationality>;
}
export class FilmService extends BaseService<StarWarsFilm, IFilm> {
    constructor() {
        const repository = new FilmRepository();
        super(repository);
    }

    async generate({ planets, nationalities, starships, vehicles, characters}: IGenerate): Promise<Array<StarWarsFilm> | undefined> {
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
            const nationalityList = this.filterNationalityList(response.species, nationalities);
            const starshipsList = this.filterStarshipsList(response.starships, starships);
            const vehiclesList = this.filterVehiclesList(response.vehicles, vehicles);
            const charactersList = this.filterCharacterList(response.characters, characters);
            return FilmMapper.responseToInterface({
                response,
                planets: planetsList,
                nationalities: nationalityList,
                starships: starshipsList,
                vehicles: vehiclesList,
                characters: charactersList,
            });
        });

        const listEntities = await this.repository.initializeDatabases(listInterface);
        if(!listEntities) {
            return;
        }

        const filteredListEntities:Array<StarWarsFilm> = listEntities.filter((item) => item !== undefined) as Array<StarWarsFilm>;
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

    private filterNationalityList(nationalities: Array<string>, nationalityList: Array<StarWarsNationality>): Array<StarWarsNationality> {
        const orders = generateListOrder(nationalities, SpecieMapper.urlDefault);
        if(!orders) {
            return [];
        }
        return nationalityList.filter((nationality) => orders.includes(nationality.order));
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
