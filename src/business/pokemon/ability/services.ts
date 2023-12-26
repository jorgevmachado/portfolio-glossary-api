import { BaseService } from '@base/service/service';
import { IResponsePokemon } from '@api/pokemon';

import { PokemonAbility } from '@entity/PokemonAbility';

import { type IAbility } from './interfaces';
import AbilityRepository from './repository';
import AbilityMapper from './mapper';

export class AbilityService extends BaseService<PokemonAbility, IAbility> {
    constructor() {
        const repository = new AbilityRepository();
        super(repository);
    }

    async generate(stats: IResponsePokemon['abilities']): Promise<Array<PokemonAbility>> {
        const data: Array<PokemonAbility> = [];
        const listInterfaces = stats.map((item) => AbilityMapper.responseToInterface(item));
        const listEntities = await this.repository.initializeDatabases(listInterfaces);
        if(!listEntities) {
            return data;
        }
        const filterListEntities: Array<PokemonAbility> = listEntities.filter(item => item !== undefined) as Array<PokemonAbility>;
        if(filterListEntities) {
            data.push(...filterListEntities);
        }
        return data;
    }
}
