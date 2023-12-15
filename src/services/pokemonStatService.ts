import { IResponseStat } from '../interfaces/pokemon/stat';
import PokemonStatRepository from '../repositories/PokemonStatRepository';
import { PokemonStats } from '../entity/PokemonStats';
import PokemonStatMapper from '../mapper/pokemonStatMapper';

export class PokemonStatService {
	async generatePokemonStat(responseStat: IResponseStat): Promise<PokemonStats | undefined> {
		const repository = new PokemonStatRepository();
		const newStat = PokemonStatMapper.responseToInterface(responseStat);
		return await repository.initializeDatabase(newStat);
	}

	async generatePokemonStats(responseStats: Array<IResponseStat>): Promise<Array<PokemonStats>> {
		const stats =  await Promise.all(
			responseStats.map(async (stat: IResponseStat) => await this.generatePokemonStat(stat))
		);
		return stats.filter(stats => stats !== undefined) as Array<PokemonStats>;
	}
}
