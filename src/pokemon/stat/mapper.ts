import { type IResponsePokemon } from '@api/pokemon';
import { type IStat } from '@pokemon/stat/interfaces';
import { generateOrder } from '@services/string';

import { PokemonStats } from '@entity/PokemonStats';

export default class StatMapper {
    static urlDefault = 'https://pokeapi.co/api/v2/stat/';

    static defaultInterface(): IStat {
        return {
            id: 'stat',
	        url: '',
	        name: '',
	        order: 0,
	        effort: 0,
	        base_stat: 0,
	        created_at: new Date(),
        };
    }

    static responseToInterface(response: IResponsePokemon['stats'][0]): IStat {
        const iEntity = StatMapper.defaultInterface();
        iEntity.url = response.stat.url;
        iEntity.name = response.stat.name;
        iEntity.order = generateOrder(response.stat.url, StatMapper.urlDefault);
        iEntity.effort = response.effort;
        iEntity.base_stat = response.base_stat;
        return iEntity;
    }

    static interfaceToEntity(iEntity: IStat): PokemonStats {
        const entity = new PokemonStats();
	    entity.url = iEntity.url;
	    entity.name = iEntity.name;
	    entity.order = iEntity.order;
	    entity.effort = iEntity.effort;
	    entity.base_stat = iEntity.base_stat;
        entity.created_at = iEntity.created_at;
        return entity;
    }
}
