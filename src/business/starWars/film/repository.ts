import { BaseRepository } from '@base/repository';

import { StarWarsFilm } from '@entity/StarWarsFilm';

import FilmMapper from './mapper';
import { type IFilm } from './interfaces';
import { AppDataSource } from '../../../data-source';

export default class FilmRepository extends BaseRepository<StarWarsFilm, IFilm> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(StarWarsFilm);
        super(repository, 'star_wars_films');
    }

    async index(): Promise<Array<StarWarsFilm>> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .leftJoinAndSelect(`${this.nameQuery}.nationalities`, 'nationalities')
            .leftJoinAndSelect(`${this.nameQuery}.planets`, 'planets')
            .leftJoinAndSelect(`${this.nameQuery}.vehicles`, 'vehicles')
            .leftJoinAndSelect(`${this.nameQuery}.starships`, 'starships')
            .orderBy(`${this.nameQuery}.order`)
            .getMany();
        if(!data) {
            return [];
        }
        return data;
    }

    async initializeDatabases(listInterface: Array<IFilm>): Promise<Array<StarWarsFilm | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (film) => await this.initializeDatabase(film)));
    }
    async initializeDatabase(iEntity: IFilm): Promise<StarWarsFilm | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if(!old) {
            const entity = FilmMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
