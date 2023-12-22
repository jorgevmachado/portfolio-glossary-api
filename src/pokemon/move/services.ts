import { BaseService } from '@base/baseService';
import { type IMove } from '@pokemon/move/interfaces';
import MoveRepository from '@pokemon/move/repository';
import { type IResponsePokemon } from '@api/pokemon';
import MoveMapper from '@pokemon/move/mapper';

import { PokemonMove } from '@entity/PokemonMove';

export class MoveService extends BaseService<PokemonMove, IMove> {
    constructor() {
        const repository = new MoveRepository();
        super(repository);
    }

    async generate(moves: IResponsePokemon['moves']): Promise<Array<PokemonMove>> {
        const data: Array<PokemonMove> = [];
        const listInterfaces = moves.map((item) => MoveMapper.responseToInterface(item));
        const listEntities = await this.repository.initializeDatabases(listInterfaces);
        if(!listEntities) {
            return data;
        }
        const filterListEntities: Array<PokemonMove> = listEntities.filter(item => item !== undefined) as Array<PokemonMove>;
        if(filterListEntities) {
            data.push(...filterListEntities);
        }
        return data;
    }
}
