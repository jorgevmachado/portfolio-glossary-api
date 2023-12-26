import { IResponsePlanet } from '@api/starWars';
import { generateOrder } from '@services/string';

import { StarWarsPlanet } from '@entity/StarWarsPlanet';

import { IPlanet } from './interfaces';

export default class PlanetMapper {
    static urlDefault = 'https://swapi.dev/api/planets/';

    static defaultInterface(): IPlanet {
        return {
            id: 'planet',
            url: '',
            name: '',
            order: 0,
            climate: '',
            gravity: '',
            diameter: '',
            terrain: '',
            population: '',
            surface_water: '',
            orbital_period: '',
            rotation_period: '',
            created_at: new Date(),
        };
    }
    static responseToInterface(response: IResponsePlanet): IPlanet {
        const iEntity = PlanetMapper.defaultInterface();
        iEntity.url = response.url;
        iEntity.name = response.name;
        iEntity.order = generateOrder(response.url, PlanetMapper.urlDefault);
        iEntity.climate = response.climate;
        iEntity.gravity = response.gravity;
        iEntity.diameter = response.diameter;
        iEntity.terrain = response.terrain;
        iEntity.population = response.population;
        iEntity.surface_water = response.surface_water;
        iEntity.orbital_period = response.orbital_period;
        iEntity.rotation_period = response.rotation_period;
        return iEntity;
    }

    static interfaceToEntity(iEntity: IPlanet): StarWarsPlanet {
        const entity = new StarWarsPlanet();
        entity.order = iEntity.order;
        entity.url = iEntity.url;
        entity.name= iEntity.name;
        entity.climate= iEntity.climate;
        entity.gravity= iEntity.gravity;
        entity.diameter= iEntity.diameter;
        entity.terrain= iEntity.terrain;
        entity.population = iEntity.population  ;
        entity.surface_water= iEntity.surface_water;
        entity.orbital_period= iEntity.orbital_period;
        entity.rotation_period= iEntity.rotation_period;
        entity.created_at = iEntity.created_at;
        return entity;
    }
}
