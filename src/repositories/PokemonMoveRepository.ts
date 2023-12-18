import { type IMove } from '@interfaces/pokemon/move';
import PokemonMoveMapper from '@mapper/pokemonMoveMapper';

import { PokemonMove } from '@entity/PokemonMove';

import { AppDataSource } from '../data-source';

export default class PokemonMoveRepository {
    constructor() {}

    public async save(entity: PokemonMove) {
        return await AppDataSource.manager.save(entity);
    }

    public async findByName(name: string) {
        return await AppDataSource.manager.findOneBy(PokemonMove, { name });
    }

    public async initializeDatabase(newMove: IMove): Promise<PokemonMove | undefined> {
        const old = await this.findByName(newMove.name);
        if(!old) {
            const entity = PokemonMoveMapper.interfaceToEntity(newMove);
            await this.save(entity);
            const result = await this.findByName(entity.name);
            return !result ? undefined : result;
        }
        return old;
    }
}
