import StringUtils from '@utilities/index';
import { type IPerson } from '@starWars/person/interfaces';
import { type IResponsePerson } from '@api/starWars';

import { StarWarsSpecies } from '@entity/starWarsSpecies';
import { StarWarsPlanet } from '@entity/StarWarsPlanet';
import { StarWarsVehicle } from '@entity/StarWarsVehicle';
import { StarWarsStarship } from '@entity/StarWarsStarship';
import { StarWarsPerson } from '@entity/StarWarsPerson';

interface IEntities {
	species?: Array<StarWarsSpecies>;
	vehicles?: Array<StarWarsVehicle>;
	homeworld?: StarWarsPlanet;
	starships?: Array<StarWarsStarship>;
}

interface IResponseToEntity extends IEntities{
	response: IResponsePerson;
}
export default class PersonMapper {

    static urlDefault = 'https://swapi.dev/api/people/';

    static defaultInterface(): IPerson {
        return {
            id: 'person',
            url: '',
            mass: '',
            name:  '',
            order: 0,
            gender: '',
            height: '',
            species: [],
            vehicles: [],
            eye_color: '',
            homeworld: undefined,
            starships: [],
            hair_color: '',
            skin_color: '',
            birth_year: '',
            created_at: new Date(),
        };
    }

    static responseToInterface({response, species = [], vehicles = [], homeworld, starships = []}: IResponseToEntity): IPerson {
        const iEntity = PersonMapper.defaultInterface();
        iEntity.url = response.url;
        iEntity.mass = response.mass;
        iEntity.name = response.name;
        iEntity.order = StringUtils.generateOrder(response.url, PersonMapper.urlDefault);
        iEntity.gender = response.gender;
        iEntity.height = response.height;
        iEntity.species = species;
        iEntity.vehicles = vehicles;
        iEntity.eye_color = response.eye_color;
        iEntity.homeworld = homeworld;
        iEntity.starships = starships;
        iEntity.hair_color = response.hair_color;
        iEntity.skin_color = response.skin_color;
        iEntity.birth_year = response.birth_year;
        return iEntity;
    }

    static interfaceToEntity(iEntity: IPerson): StarWarsPerson {
        const entity = new StarWarsPerson();
	    entity.url = iEntity.url;
	    entity.mass = iEntity.mass;
	    entity.name = iEntity.name;
	    entity.order = iEntity.order;
	    entity.gender = iEntity.gender;
	    entity.height = iEntity.height;
	    entity.species = iEntity.species;
	    entity.vehicles = iEntity.vehicles;
	    entity.eye_color = iEntity.eye_color;
	    entity.homeworld = iEntity.homeworld;
	    entity.starships = iEntity.starships;
	    entity.hair_color = iEntity.hair_color;
	    entity.skin_color = iEntity.skin_color;
	    entity.birth_year = iEntity.birth_year;
        entity.created_at = iEntity.created_at;
        return entity;
    }
}

