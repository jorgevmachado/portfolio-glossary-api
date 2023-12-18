import { Pokemon } from '../entity/Pokemon';
import { type IPokemon, type IResponsePokemonBase } from '../interfaces/pokemon/pokemon';
import { type IStat } from '../interfaces/pokemon/stat';
import PokemonStatMapper from './pokemonStatMapper';

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

    public static responseBaseToInterface(response: IResponsePokemonBase['results'][0], order: number, specie: IPokemon['specie']): IPokemon {
        return {
            id: '0',
            url: response.url,
            name: response.name,
            order: order,
            specie,
            created_at: new Date(),

        };
    }
}
