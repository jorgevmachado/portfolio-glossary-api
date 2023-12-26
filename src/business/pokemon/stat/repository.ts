import { BaseRepository } from '@base/repository';

import { PokemonStat } from '@entity/PokemonStat';

import { type IStat } from './interfaces';
import StatMapper from './mapper';
import { AppDataSource } from '../../../data-source';

export default class StatRepository extends BaseRepository<PokemonStat, IStat> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonStat);
        super(repository, 'pokemons_stats');
    }

    async initializeDatabases(listInterface: Array<IStat>): Promise<Array<PokemonStat | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (item) => await this.initializeDatabase(item)));
    }

    async initializeDatabase(iEntity: IStat): Promise<PokemonStat | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if (!old) {
            const entity = StatMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
