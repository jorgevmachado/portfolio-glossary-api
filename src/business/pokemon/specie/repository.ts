import { BaseRepository } from '@base/repository/repository';

import { PokemonSpecie } from '@entity/PokemonSpecie';

import { type ISpecie } from './interfaces';
import SpecieMapper from './mapper';
import { AppDataSource } from '../../../data-source';

export default class SpecieRepository extends BaseRepository<PokemonSpecie, ISpecie> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonSpecie);
        super(repository, 'pokemons_species');
    }
    async initializeDatabase(iEntity: ISpecie): Promise<PokemonSpecie | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if(!old) {
            const entity = SpecieMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
