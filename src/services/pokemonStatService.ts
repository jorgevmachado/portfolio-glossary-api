import { type IResponseStat, type IStat } from '@interfaces/pokemon/stat';
import PokemonStatRepository from '@repositories/PokemonStatRepository';
import PokemonStatMapper from '@mapper/pokemonStatMapper';
import { BaseService } from '@services/baseService';

import { PokemonStats } from '@entity/PokemonStats';

export class PokemonStatService extends BaseService<PokemonStats, IStat>{
    constructor() {
        const repository = new PokemonStatRepository();
        super(repository);
    }
    async generatePokemonStat(responseStat: IResponseStat): Promise<PokemonStats | undefined> {
        const newStat = PokemonStatMapper.responseToInterface(responseStat);
        return await this.repository.initializeDatabase(newStat);
    }

    async generatePokemonStats(responseStats: Array<IResponseStat>): Promise<Array<PokemonStats>> {
        const stats =  await Promise.all(
            responseStats.map(async (stat: IResponseStat) => await this.generatePokemonStat(stat))
        );
        return stats.filter(stats => stats !== undefined) as Array<PokemonStats>;
    }
}
