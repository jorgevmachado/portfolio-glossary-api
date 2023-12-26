import { BaseRepository } from '@base/repository';

import { StarWarsVehicle } from '@entity/StarWarsVehicle';

import { type IVehicle } from './interfaces';
import VehicleMapper from './mapper';
import { AppDataSource } from '../../../data-source';

export default class VehicleRepository extends BaseRepository<StarWarsVehicle, IVehicle> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(StarWarsVehicle);
        super(repository, 'star_wars_vehicles');
    }

    async initializeDatabases(listInterface: IVehicle[]): Promise<Array<StarWarsVehicle | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (vehicle) => await this.initializeDatabase(vehicle)));
    }

    async initializeDatabase(iEntity: IVehicle): Promise<StarWarsVehicle | undefined> {
        const old = await this.findByName(iEntity.name);
        if(!old) {
            const entity = VehicleMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByName(iEntity.name);
        }
        return old;
    }
}
