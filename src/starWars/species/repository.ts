import { ISpecie } from '@starWars/species/interfaces';
import { BaseRepository } from '@base/baseRepository';
import SpecieMapper from '@starWars/species/mapper';

import { StarWarsSpecies } from '@entity/starWarsSpecies';

import { AppDataSource } from '../../data-source';


export default class SpecieRepository extends BaseRepository<StarWarsSpecies, ISpecie> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(StarWarsSpecies);
        super(repository, 'star_wars_species');
    }

    async initializeDatabases(listInterface: ISpecie[]): Promise<Array<StarWarsSpecies | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (specie) => await this.initializeDatabase(specie)));
    }

    async initializeDatabase(iEntity: ISpecie): Promise<StarWarsSpecies | undefined> {
        const old = await this.findByName(iEntity.name);
        if(!old) {
            const entity = SpecieMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByName(iEntity.name);
        }
        return old;
    }
}
