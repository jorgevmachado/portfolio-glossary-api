import { BaseService } from '@base/baseService';
import { type IStat } from '@pokemon/stat/interfaces';
import StatRepository from '@pokemon/stat/repository';
import StatMapper from '@pokemon/stat/mapper';
import { IResponsePokemon } from '@api/pokemon';

import { PokemonStats } from '@entity/PokemonStats';

export class StatService extends BaseService<PokemonStats, IStat> {
    constructor() {
        const repository = new StatRepository();
        super(repository);
    }

    async generate(stats: IResponsePokemon['stats']): Promise<Array<PokemonStats>> {
        const data: Array<PokemonStats> = [];
        const listInterfaces = stats.map((item) => StatMapper.responseToInterface(item));
        const listEntities = await this.repository.initializeDatabases(listInterfaces);
        if(!listEntities) {
            return data;
        }
        const filterListEntities: Array<PokemonStats> = listEntities.filter(item => item !== undefined) as Array<PokemonStats>;
        if(filterListEntities) {
            data.push(...filterListEntities);
        }
        return data;
    }
}
