import { type IType } from '@interfaces/pokemon/type';
import PokemonTypeMapper from '@mapper/pokemon/pokemonTypeMapper';
import { BaseRepository } from '@base/baseRepository';

import { PokemonTypes } from '@entity/PokemonType';

import { AppDataSource } from '../../data-source';

export default class PokemonTypesRepository extends BaseRepository<PokemonTypes, IType>{
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonTypes);
        super(repository, 'pokemons_types');
    }

    async initializeDatabase(newType: IType): Promise<PokemonTypes | undefined> {
        const old = await this.findByName(newType.name);
        if(!old) {
            const entity = PokemonTypeMapper.interfaceToEntity(newType);
            await this.save(entity);
            const result = await this.findByName(entity.name);
            return !result ? undefined : result;
        }
        return old;
    }
}
