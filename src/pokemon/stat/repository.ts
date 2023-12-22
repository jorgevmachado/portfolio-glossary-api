import { BaseRepository } from '@base/baseRepository';
import { type IStat } from '@pokemon/stat/interfaces';
import StatMapper from '@pokemon/stat/mapper';

import { PokemonStats } from '@entity/PokemonStats';

import { AppDataSource } from '../../data-source';

export default class StatRepository extends BaseRepository<PokemonStats, IStat> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonStats);
        super(repository, 'pokemons_stats');
    }

    async initializeDatabases(listInterface: Array<IStat>): Promise<Array<PokemonStats | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (item) => await this.initializeDatabase(item)));
    }

    async initializeDatabase(iEntity: IStat): Promise<PokemonStats | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if (!old) {
            const entity = StatMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
