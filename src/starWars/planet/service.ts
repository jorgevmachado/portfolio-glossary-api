import { BaseService } from '@base/baseService';
import { IResponsePlanet, IResponseStarWarsPaginate, StarWars } from '@api/starWars';
import PlanetMapper from '@starWars/planet/mapper';
import PlanetRepository from '@starWars/planet/repository';

import { StarWarsPlanet } from '@entity/StarWarsPlanet';

import { type IPlanet } from './interfaces';

export class PlanetService extends BaseService<StarWarsPlanet, IPlanet>{
    constructor() {
        const repository = new PlanetRepository();
        super(repository);
    }

    async generate(): Promise<Array<StarWarsPlanet> | undefined> {
        const data: Array<StarWarsPlanet> = [];
        const result = await this.repository.index();
        if(result.length) {
            return result;
        }
        for (let page = 1; page <= 6; page++ ) {
            const list = await this.generateByPage(page);
            if(!list) {
                return;
            }
            const listInterface = list.results.map((item) => PlanetMapper.responseToInterface(item));
            const listEntities = await this.repository.initializeDatabases(listInterface);
            if(!listEntities) {
                return;
            }
            const filterListEntities: Array<StarWarsPlanet> = listEntities.filter((item) => item !== undefined) as Array<StarWarsPlanet>;
            if(filterListEntities) {
                data.push(...filterListEntities);
            }
        }
        return data;
    }

    private async generateByPage(page: number): Promise<IResponseStarWarsPaginate<IResponsePlanet> | undefined> {
        const responses = new StarWars();
        const response = await responses.getPlanets(page);
        if(!response) {
            return;
        }
        return response;
    }
}
