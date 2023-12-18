import { PokemonMove } from '../entity/PokemonMove';
import { type IMove, type IResponseMove } from '../interfaces/pokemon/move';

export default class PokemonMoveMapper {

    static responseToInterface(response: IResponseMove): IMove {
        return {
            id: '0',
            url: response.move.url,
            name: response.move.name,
            created_at: new Date(),
        };
    }

    static interfaceToEntity(item: IMove): PokemonMove {
        const entity = new PokemonMove();
        entity.url = item.url;
        entity.pp = item.pp;
        entity.name = item.name;
        entity.type = item.type;
        entity.power = item.power;
        entity.target = item.target;
        entity.priority = item.priority;
        entity.accuracy = item.accuracy;
        entity.created_at = new Date();
        return entity;
    }
}
