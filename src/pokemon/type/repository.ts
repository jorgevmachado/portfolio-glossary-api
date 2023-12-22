import { BaseRepository } from '@base/baseRepository';
import { type IType } from '@pokemon/type/interfaces';
import TypeMapper from '@pokemon/type/mapper';

import { PokemonTypes } from '@entity/PokemonType';

import { AppDataSource } from '../../data-source';

export default class TypeRepository extends BaseRepository<PokemonTypes, IType> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonTypes);
        super(repository, 'pokemons_types');
    }

    async initializeDatabases(listInterface: Array<IType>): Promise<Array<PokemonTypes | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (item) => await this.initializeDatabase(item)));
    }

    async initializeDatabase(iEntity: IType): Promise<PokemonTypes | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if (!old) {
            const entity = TypeMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
