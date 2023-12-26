import { BaseService } from '@base/service/service';
import { type IResponseSpecie, type IResponseStarWarsPaginate, StarWars } from '@api/starWars';

import { StarWarsNationality } from '@entity/starWarsNationality';

import { INationality } from './interfaces';
import NationalityRepository from './repository';
import SpecieMapper from './mapper';


export class NationalityService extends BaseService<StarWarsNationality, INationality> {
    constructor() {
        const repository = new NationalityRepository();
        super(repository);
    }

    async generate(): Promise<Array<StarWarsNationality> | undefined> {
        const data: Array<StarWarsNationality> = [];
        const result = await this.repository.index();
        if(result.length) {
            return result;
        }
        for (let page = 1; page <= 4; page++) {
            const list = await this.generateByPage(page);
            if(!list) {
                return;
            }
            const listInterface = list.results.map((item) => SpecieMapper.responseToInterface(item));
            const listEntities = await this.repository.initializeDatabases(listInterface);
            if(!listEntities) {
                return;
            }
            const filterListEntities: Array<StarWarsNationality> = listEntities.filter((item) => item !== undefined) as Array<StarWarsNationality>;
            if(filterListEntities) {
                data.push(...filterListEntities);
            }
        }
        return data;
    }

    private async generateByPage(page: number): Promise<IResponseStarWarsPaginate<IResponseSpecie> | undefined> {
        const responses = new StarWars();
        const response = await responses.getSpecies(page);
        if(!response) {
            return;
        }
        return response;
    }
}
