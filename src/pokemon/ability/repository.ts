import { BaseRepository } from '@base/baseRepository';
import { type IAbility } from '@pokemon/ability/interfaces';
import AbilityMapper from '@pokemon/ability/mapper';

import { PokemonAbility } from '@entity/PokemonAbility';

import { AppDataSource } from '../../data-source';

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
