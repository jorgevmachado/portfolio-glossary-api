import { BaseRepository } from '@base/repository/repository';

import { PokemonMove } from '@entity/PokemonMove';

import { type IMove } from './interfaces';
import MoveMapper from './mapper';
import { AppDataSource } from '../../../data-source';

export default class MoveRepository extends BaseRepository<PokemonMove, IMove> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonMove);
        super(repository, 'pokemons_moves');
    }

    async initializeDatabases(listInterface: Array<IMove>): Promise<Array<PokemonMove | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (item) => await this.initializeDatabase(item)));
    }

    async initializeDatabase(iEntity: IMove): Promise<PokemonMove | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if (!old) {
            const entity = MoveMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
