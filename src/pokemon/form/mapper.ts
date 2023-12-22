import { type IForm } from '@pokemon/form/interfaces';
import { IResponseForm } from '@api/pokemon';
import { generateOrder } from '@services/string';

import { PokemonForm } from '@entity/PokemonForm';

export default class FormMapper {
    static urlDefault = 'https://pokeapi.co/api/v2/pokemon-form/';

    static defaultInterface(): IForm {
        return {
            id: 'form',
	        url: '',
	        name: '',
	        order: 0,
	        is_mega: false,
	        is_default: false,
	        is_battle_only: false,
	        version_group_url: '',
	        version_group_name: '',
            created_at: new Date(),
        };
    }

    static responseToInterface(response: IResponseForm): IForm {
        const iEntity = FormMapper.defaultInterface();
	    iEntity.name = response.name;
        iEntity.url = response.url;
	    iEntity.order = generateOrder(response.url, FormMapper.urlDefault);
	    iEntity.is_mega = response.is_mega;
	    iEntity.is_default = response.is_default;
	    iEntity.back_shiny = response.sprites.back_shiny;
	    iEntity.back_female = response.sprites.back_female;
	    iEntity.front_shiny = response.sprites.front_shiny;
	    iEntity.front_female = response.sprites.front_female;
	    iEntity.back_default = response.sprites.back_default;
	    iEntity.front_default = response.sprites.front_default;
	    iEntity.is_battle_only = response.is_battle_only;
	    iEntity.version_group_url = response.version_group.url;
	    iEntity.back_shiny_female = response.sprites.back_shiny_female;
	    iEntity.version_group_name = response.version_group.name;
	    iEntity.front_shiny_female = response.sprites.front_shiny_female;
        return iEntity;
    }

    static interfaceToEntity(iEntity: IForm): PokemonForm {
        const entity = new PokemonForm();
	    entity.url = iEntity.url;
        entity.name = iEntity.name;
	    entity.order = iEntity.order;
	    entity.is_mega = iEntity.is_mega;
	    entity.is_default = iEntity.is_default;
	    entity.back_shiny = iEntity.back_shiny;
	    entity.back_female = iEntity.back_female;
	    entity.front_shiny = iEntity.front_shiny;
	    entity.front_female = iEntity.front_female;
	    entity.back_default = iEntity.back_default;
	    entity.front_default = iEntity.front_default;
	    entity.is_battle_only = iEntity.is_battle_only;
	    entity.version_group_url = iEntity.version_group_url;
	    entity.back_shiny_female = iEntity.back_shiny_female;
	    entity.version_group_name = iEntity.version_group_name;
	    entity.front_shiny_female = iEntity.front_shiny_female;
	    entity.created_at = iEntity.created_at;
        return entity;
    }
}
