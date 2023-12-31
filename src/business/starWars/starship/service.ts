import { type IResponseStarship, type IResponseStarWarsPaginate, StarWars } from '@api/starWars';
import { BaseService } from '@base/service';

import { StarWarsStarship } from '@entity/StarWarsStarship';

import { type IStarship } from './interfaces';
import StarshipRepository from './repository';
import StarshipMapper from './mapper';


export class StarshipService extends BaseService<StarWarsStarship, IStarship> {
    constructor() {
        const repository = new StarshipRepository();
        super(repository);
    }

    async generate(): Promise<Array<StarWarsStarship> | undefined> {
        const data: Array<StarWarsStarship> = [];
        const result = await this.repository.index();
        if(result.length) {
            return result;
        }
        for (let page = 1; page <= 4; page++) {
            const list = await this.generateByPage(page);
            if(!list) {
                return;
            }
            const listInterface = list.results.map((item) => StarshipMapper.responseToInterface(item));
            const listEntities = await this.repository.initializeDatabases(listInterface);
            if(!listEntities) {
                return;
            }
            const filterListEntities: Array<StarWarsStarship> = listEntities.filter((item) => item !== undefined) as Array<StarWarsStarship>;
            if(filterListEntities) {
                data.push(...filterListEntities);
            }
        }
        return data;
    }

    private async generateByPage(page: number): Promise<IResponseStarWarsPaginate<IResponseStarship> | undefined> {
        const responses = new StarWars();
        const response = await responses.getStarships(page);
        if(!response) {
            return;
        }
        return response;
    }
}
