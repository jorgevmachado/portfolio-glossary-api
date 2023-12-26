import { type IResponsePokemon } from '@api/pokemon';
import { generateOrder } from '@services/string';

import { PokemonType } from '@entity/PokemonType';

import { type IType } from './interfaces';
import { POKEMON_TYPE_COLORS } from './config';


export default class TypeMapper {
    static urlDefault = 'https://pokeapi.co/api/v2/type/';

    static defaultInterface(): IType {
        return {
            id: 'type',
	        url: '',
	        name: '',
	        order: 0,
	        textColor: '',
	        backgroundColor: '',
	        created_at: new Date(),
        };
    }

    static responseToInterface(response: IResponsePokemon['types'][0]): IType {
        const iEntity = TypeMapper.defaultInterface();
        const typeColor = POKEMON_TYPE_COLORS.find(item => item.name === response.type.name);
	    iEntity.url = response.type.url;
        iEntity.name = response.type.name;
        iEntity.order = generateOrder(response.type.url, TypeMapper.urlDefault);
        iEntity.textColor = !typeColor ? '#fff' : typeColor.textColor;
        iEntity.backgroundColor = !typeColor ? '#ff2400' : typeColor.backgroundColor;
        return iEntity;
    }

    static interfaceToEntity(iEntity: IType): PokemonType {
        const entity = new PokemonType();
	    entity.url = iEntity.url;
	    entity.name = iEntity.name;
	    entity.order = iEntity.order;
	    entity.textColor = iEntity.textColor;
	    entity.backgroundColor = iEntity.backgroundColor;
        entity.created_at = iEntity.created_at;
        return entity;
    }
}
