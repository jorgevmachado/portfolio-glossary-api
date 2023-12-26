import { BaseRepository } from '@base/repository';

import { PokemonType } from '@entity/PokemonType';

import { type IType } from './interfaces';
import TypeMapper from './mapper';
import { AppDataSource } from '../../../data-source';

export default class TypeRepository extends BaseRepository<PokemonType, IType> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonType);
        super(repository, 'pokemons_types');
    }

    async initializeDatabases(listInterface: Array<IType>): Promise<Array<PokemonType | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (item) => await this.initializeDatabase(item)));
    }

    async initializeDatabase(iEntity: IType): Promise<PokemonType | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if (!old) {
            const entity = TypeMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
