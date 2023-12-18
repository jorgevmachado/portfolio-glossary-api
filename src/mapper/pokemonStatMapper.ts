import { PokemonStats } from '../entity/PokemonStats';
import { type IResponseStat, type IStat } from '../interfaces/pokemon/stat';

export default class PokemonStatMapper {
	public static interfaceToEntity(item: IStat): PokemonStats {
		const entity = new PokemonStats();
		entity.url = item.url;
		entity.name = item.name;
		entity.effort = item.effort;
		entity.base_stat = item.base_stat;
		entity.created_at = new Date();
		return entity;
	}

	public static listInterfaceToListEntity(items: Array<IStat>): Array<PokemonStats> {
		return items.map((item) => this.interfaceToEntity(item));
	}

	public static responseToInterface(response: IResponseStat): IStat {
		return {
			id: '0',
			url: response.stat.url,
			name: response.stat.name,
			effort: response.effort,
			base_stat: response.base_stat,
			created_at: new Date(),
		};
	}
}
