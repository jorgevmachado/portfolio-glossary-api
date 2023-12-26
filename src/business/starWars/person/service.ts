import { type IResponsePerson, type IResponseStarWarsPaginate, StarWars } from '@api/starWars';
import { generateListOrder, generateOrder } from '@services/string';
import SpecieMapper from '@business/starWars/nationality/mapper';
import { BaseService } from '@base/service';

import { StarWarsPlanet } from '@entity/StarWarsPlanet';
import { StarWarsStarship } from '@entity/StarWarsStarship';
import { StarWarsVehicle } from '@entity/StarWarsVehicle';
import { StarWarsNationality } from '@entity/starWarsNationality';
import { StarWarsPerson } from '@entity/StarWarsPerson';

import VehicleMapper from '../vehicle/mapper';
import StarshipMapper from '../starship/mapper';
import PlanetMapper from '../planet/mapper';
import PersonMapper from './mapper';
import PersonRepository from './repository';
import { type IPerson } from './interfaces';

interface IGenerate {
    planets: Array<StarWarsPlanet>;
    vehicles: Array<StarWarsVehicle>;
    starships: Array<StarWarsStarship>;
    nationalities: Array<StarWarsNationality>;
}

export class PersonService extends BaseService<StarWarsPerson, IPerson> {

    constructor() {
        const repository = new PersonRepository();
        super(repository);
    }

    async generate({planets, nationalities, starships, vehicles}: IGenerate): Promise<Array<StarWarsPerson> | undefined> {
        const data: Array<StarWarsPerson> = [];
        const result = await this.repository.index();
        if(result.length) {
            return result;
        }
        for(let page = 1; page <= 9; page++) {
            const list = await this.generateByPage(page);
            if(!list) {
                return;
            }
            const listInterface = list.results.map((response) => {
                const homeworld = this.filterHomeworld(response.homeworld, planets);
                const speciesList = this.filterSpeciesList(response.species, nationalities);
                const starshipsList = this.filterStarshipsList(response.starships, starships);
                const vehiclesList = this.filterVehiclesList(response.vehicles, vehicles);
                return PersonMapper.responseToInterface({
                    response,
                    homeworld,
                    species: speciesList,
                    starships: starshipsList,
                    vehicles: vehiclesList,
                });
            });
            const listEntities = await this.repository.initializeDatabases(listInterface);
            if(!listEntities) {
                return;
            }
            const filteredListEntities:Array<StarWarsPerson> = listEntities.filter((item) => item !== undefined) as Array<StarWarsPerson>;
            if(filteredListEntities) {
                data.push(...filteredListEntities);
            }
        }
        return data;
    }

    private async generateByPage(page: number): Promise<IResponseStarWarsPaginate<IResponsePerson> | undefined> {
        const responses = new StarWars();
        const response = await responses.getPeoples(page);
        if(!response) {
            return;
        }
        return response;

    }

    private filterHomeworld(homeworld: string, planets: Array<StarWarsPlanet>): StarWarsPlanet {
        const order = generateOrder(homeworld, PlanetMapper.urlDefault);
        return planets.find((planet) => planet.order === order) as StarWarsPlanet;
    }

    private filterSpeciesList(species: Array<string>, speciesList: Array<StarWarsNationality>): Array<StarWarsNationality> {
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
}
