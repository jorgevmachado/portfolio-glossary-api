import { BaseService } from '@base/service/service';
import { type IResponsePokemon } from '@api/pokemon';

import { PokemonMove } from '@entity/PokemonMove';

import { type IMove } from './interfaces';
import MoveRepository from './repository';
import MoveMapper from './mapper';


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
