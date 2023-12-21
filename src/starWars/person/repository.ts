import { BaseRepository } from '@base/baseRepository';
import { type IPerson } from '@starWars/person/interfaces';
import PersonMapper from '@starWars/person/mapper';

import { StarWarsPerson } from '@entity/StarWarsPerson';

import { AppDataSource } from '../../data-source';

export default class PersonRepository extends BaseRepository<StarWarsPerson, IPerson> {

    constructor() {
        const repository = AppDataSource.manager.getRepository(StarWarsPerson);
        super(repository, 'star_wars_people');
    }

    async initializeDatabases(listInterface: Array<IPerson>): Promise<Array<StarWarsPerson | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (person) => await this.initializeDatabase(person)));
    }

    async initializeDatabase(iEntity: IPerson): Promise<StarWarsPerson | undefined> {
        const old = await this.findByName(iEntity.name);
        if (!old) {
            const entity = PersonMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByName(iEntity.name);
        }
        return old;
    }
}
