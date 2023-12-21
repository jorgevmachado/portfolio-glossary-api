import { BaseRepository } from '@base/baseRepository';
import PlanetMapper from '@starWars/planet/mapper';

import { StarWarsPlanet } from '@entity/StarWarsPlanet';

import { type IPlanet } from './interfaces';
import { AppDataSource } from '../../data-source';



export default class PlanetRepository extends BaseRepository<StarWarsPlanet, IPlanet> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(StarWarsPlanet);
        super(repository, 'star_wars_planets');
    }

    async initializeDatabases(listInterface: IPlanet[]): Promise<Array<StarWarsPlanet | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (planet) => await this.initializeDatabase(planet)));
    }

    async initializeDatabase(iEntity: IPlanet): Promise<StarWarsPlanet | undefined> {
        const old = await this.findByName(iEntity.name);
        if(!old) {
            const entity = PlanetMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByName(iEntity.name);
        }
        return old;
    }
}
