import { type IResponseStarship } from '@api/starWars';
import { generateOrder } from '@services/string';

import { StarWarsStarship } from '@entity/StarWarsStarship';

import { type IStarship } from './interfaces';

export default class StarshipMapper {
    static urlDefault = 'https://swapi.dev/api/starships/';


    static defaultInterface(): IStarship {
        return {
	        id: 'starship',
	        url: '',
	        crew: '',
	        order: 0,
	        MGLT: '',
	        name: '',
	        model: '',
	        length: '',
	        passengers: '',
	        consumables: '',
	        manufacturer: '',
	        starship_class: '',
	        cargo_capacity: '',
	        cost_in_credits: '',
	        hyperdrive_rating: '',
	        max_atmosphering_speed: '',
	        created_at: new Date()
        };
    }

    static responseToInterface(response: IResponseStarship): IStarship {
        const iEntity = StarshipMapper.defaultInterface();
        iEntity.url =  response.url;
        iEntity.crew =  response.crew;
	    iEntity.order = generateOrder(response.url, StarshipMapper.urlDefault);
        iEntity.MGLT =  response.MGLT;
        iEntity.name =  response.name;
        iEntity.model =  response.model;
        iEntity.length =  response.length;
        iEntity.passengers =  response.passengers;
        iEntity.consumables =  response.consumables;
        iEntity.manufacturer =  response.manufacturer;
        iEntity.starship_class =  response.starship_class;
        iEntity.cargo_capacity =  response.cargo_capacity;
        iEntity.cost_in_credits =  response.cost_in_credits;
        iEntity.hyperdrive_rating =  response.hyperdrive_rating;
        iEntity.max_atmosphering_speed =  response.max_atmosphering_speed;
        return iEntity;
    }

    static interfaceToEntity(iEntity: IStarship): StarWarsStarship {
        const entity = new StarWarsStarship();
        entity.url =  iEntity.url;
        entity.crew =  iEntity.crew;
        entity.order = iEntity.order;
        entity.MGLT =  iEntity.MGLT;
        entity.name =  iEntity.name;
        entity.model =  iEntity.model;
        entity.length =  iEntity.length;
        entity.passengers =  iEntity.passengers;
        entity.consumables =  iEntity.consumables;
        entity.manufacturer =  iEntity.manufacturer;
        entity.starship_class =  iEntity.starship_class;
        entity.cargo_capacity =  iEntity.cargo_capacity;
        entity.cost_in_credits =  iEntity.cost_in_credits;
        entity.hyperdrive_rating =  iEntity.hyperdrive_rating;
        entity.max_atmosphering_speed =  iEntity.max_atmosphering_speed;
        entity.created_at = iEntity.created_at;
        return entity;
    }
}
