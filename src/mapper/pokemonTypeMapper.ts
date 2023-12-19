import { type IResponseType, type IType } from '@interfaces/pokemon/type';
import { POKEMON_TYPE_COLORS } from '@controllers/pokemonUtils';

import { PokemonTypes } from '@entity/PokemonType';

export default class PokemonTypeMapper {

    static responseToInterface(response: IResponseType): IType {
        const type = response.type;
        const typeConstant = POKEMON_TYPE_COLORS.filter((item) => item.name === type.name)[0];
        return {
            id: '0',
            name: type.name,
            textColor: typeConstant.textColor || '#FFF',
            backgroundColor: typeConstant.backgroundColor || '#000',
            created_at: new Date(),
        };
    }

    static interfaceToEntity(item: IType): PokemonTypes {
        const entity = new PokemonTypes();
        entity.name = item.name;
        entity.textColor = item.textColor;
        entity.backgroundColor = item.backgroundColor;
        entity.created_at = new Date();
        return entity;
    }
}
