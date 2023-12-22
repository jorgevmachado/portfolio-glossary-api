import { BaseRepository } from '@base/baseRepository';
import { type ISpecie } from '@pokemon/specie/interfaces';
import SpecieMapper from '@pokemon/specie/mapper';

import { PokemonSpecies } from '@entity/PokemonSpecies';

import { AppDataSource } from '../../data-source';

export default class SpecieRepository extends BaseRepository<PokemonSpecies, ISpecie> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonSpecies);
        super(repository, 'pokemons_species');
    }
    async initializeDatabase(iEntity: ISpecie): Promise<PokemonSpecies | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if(!old) {
            const entity = SpecieMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
