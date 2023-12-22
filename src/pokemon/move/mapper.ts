import { type IResponsePokemon } from '@api/pokemon';
import { type IMove } from '@pokemon/move/interfaces';
import { generateOrder } from '@services/string';

import { PokemonMove } from '@entity/PokemonMove';

export default class MoveMapper {
    static urlDefault =  'https://pokeapi.co/api/v2/move/';

    static defaultInterface(): IMove {
        return {
            id: 'move',
            url: '',
            order: 0,
            name: '',
            created_at: new Date(),
        };
    }

    static responseToInterface(response: IResponsePokemon['moves'][0]): IMove {
        const iEntity = MoveMapper.defaultInterface();
        iEntity.url = response.move.url;
        iEntity.order = generateOrder(response.move.url,MoveMapper.urlDefault );
        iEntity.name = response.move.name;
        return iEntity;
    }

    static interfaceToEntity(iEntity: IMove): PokemonMove {
        const entity = new PokemonMove();
	    entity.url = iEntity.url;
	    entity.order = iEntity.order;
	    entity.name = iEntity.name;
	    entity.created_at = iEntity.created_at;
        return entity;
    }
}
