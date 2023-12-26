import { IResponsePokemon } from '@api/pokemon';
import { BaseService } from '@base/service';

import { PokemonStat } from '@entity/PokemonStat';

import { type IStat } from './interfaces';
import StatRepository from './repository';
import StatMapper from './mapper';


export class StatService extends BaseService<PokemonStat, IStat> {
    constructor() {
        const repository = new StatRepository();
        super(repository);
    }

    async generate(stats: IResponsePokemon['stats']): Promise<Array<PokemonStat>> {
        const data: Array<PokemonStat> = [];
        const listInterfaces = stats.map((item) => StatMapper.responseToInterface(item));
        const listEntities = await this.repository.initializeDatabases(listInterfaces);
        if(!listEntities) {
            return data;
        }
        const filterListEntities: Array<PokemonStat> = listEntities.filter(item => item !== undefined) as Array<PokemonStat>;
        if(filterListEntities) {
            data.push(...filterListEntities);
        }
        return data;
    }
}
