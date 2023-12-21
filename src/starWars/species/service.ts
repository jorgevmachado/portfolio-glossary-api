import { BaseService } from '@base/baseService';
import { ISpecie } from '@starWars/species/interfaces';
import SpecieRepository from '@starWars/species/repository';
import SpecieMapper from '@starWars/species/mapper';
import { IResponseStarWarsPaginate, IResponseSpecie, StarWars } from '@api/starWars';

import { StarWarsSpecies } from '@entity/starWarsSpecies';

export class SpecieService extends BaseService<StarWarsSpecies, ISpecie> {
    constructor() {
        const repository = new SpecieRepository();
        super(repository);
    }

    async generate(): Promise<Array<StarWarsSpecies> | undefined> {
        const data: Array<StarWarsSpecies> = [];
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
            const filterListEntities: Array<StarWarsSpecies> = listEntities.filter((item) => item !== undefined) as Array<StarWarsSpecies>;
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
