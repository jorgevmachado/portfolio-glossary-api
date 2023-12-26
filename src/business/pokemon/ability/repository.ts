import { BaseRepository } from '@base/repository/repository';

import { PokemonAbility } from '@entity/PokemonAbility';

import { type IAbility } from './interfaces';
import AbilityMapper from './mapper';
import { AppDataSource } from '../../../data-source';

export default class AbilityRepository extends BaseRepository<PokemonAbility, IAbility> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonAbility);
        super(repository, 'pokemons_ability');
    }

    async initializeDatabases(listInterface: Array<IAbility>): Promise<Array<PokemonAbility | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (item) => await this.initializeDatabase(item)));
    }

    async initializeDatabase(iEntity: IAbility): Promise<PokemonAbility | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if (!old) {
            const entity = AbilityMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
