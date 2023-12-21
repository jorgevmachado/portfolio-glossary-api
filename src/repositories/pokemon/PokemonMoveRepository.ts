import { type IMove } from '@interfaces/pokemon/move';
import PokemonMoveMapper from '@mapper/pokemon/pokemonMoveMapper';
import { BaseRepository } from '@base/baseRepository';

import { PokemonMove } from '@entity/PokemonMove';

import { AppDataSource } from '../../data-source';

export default class PokemonMoveRepository extends BaseRepository<PokemonMove, IMove>{
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonMove);
        super(repository, 'pokemons_moves');
    }

    public async initializeDatabase(newMove: IMove): Promise<PokemonMove | undefined> {
        const old = await this.findByName(newMove.name);
        if(!old) {
            const entity = PokemonMoveMapper.interfaceToEntity(newMove);
            await this.save(entity);
            const result = await this.findByName(entity.name);
            return !result ? undefined : result;
        }
        return old;
    }
}
