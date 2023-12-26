import { BaseService } from '@base/service/service';
import { type IResponseStarWarsPaginate, type IResponseVehicle, StarWars } from '@api/starWars';

import { StarWarsVehicle } from '@entity/StarWarsVehicle';

import { type IVehicle } from './interfaces';
import VehicleMapper from './mapper';
import VehicleRepository from './repository';


export class VehicleService extends BaseService<StarWarsVehicle, IVehicle> {
    constructor() {
        const repository = new VehicleRepository();
        super(repository);
    }

    async generate(): Promise<Array<StarWarsVehicle> | undefined> {
        const data: Array<StarWarsVehicle> = [];
        const result = await this.repository.index();
        if(result.length) {
            return result;
        }
        for (let page = 1; page <= 4; page++) {
            const list = await this.generateByPage(page);
            if(!list) {
                return;
            }
            const listInterface = list.results.map((item) => VehicleMapper.responseToInterface(item));
            const listEntities = await this.repository.initializeDatabases(listInterface);
            if(!listEntities) {
                return;
            }
            const filterListEntities: Array<StarWarsVehicle> = listEntities.filter((item) => item !== undefined) as Array<StarWarsVehicle>;
            if(filterListEntities) {
                data.push(...filterListEntities);
            }
        }
        return data;
    }

    private async generateByPage(page: number): Promise<IResponseStarWarsPaginate<IResponseVehicle> | undefined> {
        const responses = new StarWars();
        const response = await responses.getVehicles(page);
        if(!response) {
            return;
        }
        return response;
    }
}
