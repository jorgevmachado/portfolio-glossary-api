import { type IResponsePokemon } from '@api/pokemon';
import { generateOrder } from '@services/string';

import { PokemonAbility } from '@entity/PokemonAbility';

import { type IAbility } from './interfaces';

export default class AbilityMapper {
    static urlDefault = 'https://pokeapi.co/api/v2/ability/';

    static defaultInterface(): IAbility {
        return {
            id: 'ability',
	        url: '',
	        name: '',
	        slot: 0,
	        order: 0,
	        is_hidden: false,
	        created_at: new Date(),
        };
    }

    static responseToInterface(response: IResponsePokemon['abilities'][0]): IAbility {
        const iEntity = AbilityMapper.defaultInterface();
	    iEntity.url = response.ability.url;
	    iEntity.name = response.ability.name;
	    iEntity.slot = response.slot;
	    iEntity.order = generateOrder(response.ability.url, AbilityMapper.urlDefault);
	    iEntity.is_hidden = response.is_hidden;
        return iEntity;
    }

    static interfaceToEntity(iEntity: IAbility): PokemonAbility {
        const entity = new PokemonAbility();
	    entity.url = iEntity.url;
	    entity.name = iEntity.name;
	    entity.slot = iEntity.slot;
	    entity.order = iEntity.order;
	    entity.is_hidden = iEntity.is_hidden;
	    entity.created_at = iEntity.created_at;
        return entity;
    }
}
