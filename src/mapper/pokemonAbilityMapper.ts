import { type IAbility, type IResponseAbility } from '@interfaces/pokemon/ability';

import { PokemonAbility } from '@entity/PokemonAbility';


export default class PokemonAbilityMapper {

    static interfaceToEntity(item: IAbility): PokemonAbility {
        const entity = new PokemonAbility();
        entity.url = item.url;
        entity.name = item.name;
        entity.slot = item.slot;
        entity.is_hidden = item.is_hidden;
        entity.created_at = new Date();
        return entity;
    }

    static responseToInterface(response: IResponseAbility): IAbility {
        return {
            id: '0',
            url: response.ability.url,
            name: response.ability.name,
            slot: response.slot,
            is_hidden: response.is_hidden,
            created_at: new Date(),
        };
    }
}
