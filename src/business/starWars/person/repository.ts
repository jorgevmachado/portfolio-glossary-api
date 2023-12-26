import { BaseRepository } from '@base/repository/repository';
import { fileImageUrl } from '@services/*';

import { StarWarsPerson } from '@entity/StarWarsPerson';

import { type IPerson } from './interfaces';
import PersonMapper from './mapper';
import { AppDataSource } from '../../../data-source';

export default class PersonRepository extends BaseRepository<StarWarsPerson, IPerson> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(StarWarsPerson);
        super(repository, 'star_wars_people');
    }

    transformReceiveData(entity: StarWarsPerson): StarWarsPerson {
        const port = process.env.PORT;
        const host = process.env.HOST;
        entity.image = fileImageUrl(host, port, entity.image || 'star-wars-logo.webp');
        return entity;
    }

    async index(): Promise<Array<StarWarsPerson>> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .leftJoinAndSelect(`${this.nameQuery}.nationalities`, 'nationalities')
            .leftJoinAndSelect(`${this.nameQuery}.vehicles`, 'vehicles')
            .leftJoinAndSelect(`${this.nameQuery}.homeworld`, 'homeworld')
            .leftJoinAndSelect(`${this.nameQuery}.starships`, 'starships')
            .orderBy(`${this.nameQuery}.order`)
            .getMany();
        if(!data) {
            return [];
        }
        return data.map(item => this.transformReceiveData(item));
    }

    async findByName(name: string): Promise<StarWarsPerson | undefined> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .leftJoinAndSelect(`${this.nameQuery}.nationalities`, 'nationalities')
            .leftJoinAndSelect(`${this.nameQuery}.vehicles`, 'vehicles')
            .leftJoinAndSelect(`${this.nameQuery}.homeworld`, 'homeworld')
            .leftJoinAndSelect(`${this.nameQuery}.starships`, 'starships')
            .andWhere(`${this.nameQuery}.name = :name`, { name })
            .getOne();
        if (!data) {
            return;
        }
        return this.transformReceiveData(data);
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
