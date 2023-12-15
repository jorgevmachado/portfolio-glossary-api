import { Pokemon } from '../entity/Pokemon';
import { IPokemon } from '../interfaces/pokemon/pokemon';
import PokemonStatMapper from './pokemonStatMapper';
import { IStat } from '../interfaces/pokemon/stat';

export default class PokemonMapper {
	public static interfaceToEntity(data: IPokemon): Pokemon {
		const statsOtherUndefined = !data.stats ? [] : data.stats.filter((stat) => stat !== undefined) as Array<IStat>;
		const stats = PokemonStatMapper.listInterfaceToListEntity(statsOtherUndefined);
		const entity = new Pokemon();
		entity.name = data.name;
		entity.url = data.url;
		entity.order = data.order;
		entity.specie = data.specie;
		entity.stats = stats;
		entity.created_at = new Date();
		return entity;
	}
}
