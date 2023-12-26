import { type IResponseVehicle } from '@api/starWars';
import { generateOrder } from '@services/string';

import { StarWarsVehicle } from '@entity/StarWarsVehicle';

import { type IVehicle } from './interfaces';

export default class VehicleMapper {
    static urlDefault = 'https://swapi.dev/api/vehicles/';

    static defaultInterface(): IVehicle {
        return {
            id: 'vehicle',
	        url: '',
	        crew: '',
	        name: '',
	        model: '',
	        order: 0,
	        length: '',
	        passengers: '',
	        consumables: '',
	        manufacturer: '',
	        vehicle_class: '',
	        cargo_capacity: '',
	        cost_in_credits: '',
	        max_atmosphering_speed: '',
            created_at: new Date(),
        };
    }

    static responseToInterface(response: IResponseVehicle): IVehicle {
        const iEntity = VehicleMapper.defaultInterface();
	    iEntity.url = response.url;
	    iEntity.crew = response.crew;
	    iEntity.name = response.name;
	    iEntity.model = response.model;
	    iEntity.order = generateOrder(response.url, VehicleMapper.urlDefault);
	    iEntity.length = response.length;
	    iEntity.passengers = response.passengers;
	    iEntity.consumables = response.consumables;
	    iEntity.manufacturer = response.manufacturer;
	    iEntity.vehicle_class = response.vehicle_class;
	    iEntity.cargo_capacity = response.cargo_capacity;
	    iEntity.cost_in_credits = response.cost_in_credits;
	    iEntity.max_atmosphering_speed = response.max_atmosphering_speed;
        return iEntity;
    }

	 static interfaceToEntity(iEntity: IVehicle): StarWarsVehicle {
        const entity = new StarWarsVehicle();
		 entity.url = iEntity.url;
		 entity.crew = iEntity.crew;
		 entity.name = iEntity.name;
		 entity.model = iEntity.model;
		 entity.order = iEntity.order;
		 entity.length = iEntity.length;
		 entity.passengers = iEntity.passengers;
		 entity.consumables = iEntity.consumables;
		 entity.manufacturer = iEntity.manufacturer;
		 entity.vehicle_class = iEntity.vehicle_class;
		 entity.cargo_capacity = iEntity.cargo_capacity;
		 entity.cost_in_credits = iEntity.cost_in_credits;
		 entity.max_atmosphering_speed = iEntity.max_atmosphering_speed;
		 entity.created_at = iEntity.created_at;
        return entity;
    }
}
