import { type IStat } from '@interfaces/pokemon/stat';
import PokemonStatMapper from '@mapper/pokemon/pokemonStatMapper';
import { BaseRepository } from '@base/baseRepository';

import { PokemonStats } from '@entity/PokemonStats';

import { AppDataSource } from '../../data-source';

export default class PokemonStatRepository extends BaseRepository<PokemonStats, IStat>{
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonStats);
        super(repository, 'pokemons_stats');
    }

    async initializeDatabase(stat: IStat): Promise<PokemonStats | undefined> {
        const old = await this.findByStat(stat);
        if(!old) {
            const pokemonStat = PokemonStatMapper.interfaceToEntity(stat);
            await this.save(pokemonStat);
            const result = await this.findByStat(pokemonStat);
            return !result ? undefined : result;
        }
        return old;
    }

    async findByStat(newStat: IStat) {
        return AppDataSource.manager.findOneBy(PokemonStats, {
            name: newStat.name,
            effort: newStat.effort,
            base_stat: newStat.base_stat,
        });
    }
}
