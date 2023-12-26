import { BaseRepository } from '@base/repository';

import { StarWarsNationality } from '@entity/starWarsNationality';

import { INationality } from './interfaces';
import SpecieMapper from './mapper';
import { AppDataSource } from '../../../data-source';


export default class NationalityRepository extends BaseRepository<StarWarsNationality, INationality> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(StarWarsNationality);
        super(repository, 'star_wars_nationalities');
    }

    async initializeDatabases(listInterface: INationality[]): Promise<Array<StarWarsNationality | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (specie) => await this.initializeDatabase(specie)));
    }

    async initializeDatabase(iEntity: INationality): Promise<StarWarsNationality | undefined> {
        const old = await this.findByName(iEntity.name);
        if(!old) {
            const entity = SpecieMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByName(iEntity.name);
        }
        return old;
    }
}
