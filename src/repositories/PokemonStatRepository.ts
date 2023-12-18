import { AppDataSource } from '../data-source';
import { PokemonStats } from '../entity/PokemonStats';
import { type IStat } from '../interfaces/pokemon/stat';

import PokemonStatMapper from '../mapper/pokemonStatMapper';

export default class PokemonStatRepository {
    constructor() {}

    public async save(stat: PokemonStats) {
        return await AppDataSource.manager.save(stat);
    }

    public async findById(id: string) {
        return await AppDataSource.manager.findOneBy(PokemonStats, { id });
    }

    public async findByName(name: string) {
        return await AppDataSource.manager.findOneBy(PokemonStats, { name });
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
