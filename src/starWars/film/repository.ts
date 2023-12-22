import { type IFilm } from '@starWars/film/interfaces';
import { BaseRepository } from '@base/baseRepository';
import FilmMapper from '@starWars/film/mapper';

import { StarWarsFilms } from '@entity/StarWarsFilms';
import { StarWarsPerson } from '@entity/StarWarsPerson';

import { AppDataSource } from '../../data-source';

export default class FilmRepository extends BaseRepository<StarWarsFilms, IFilm> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(StarWarsFilms);
        super(repository, 'star_wars_films');
    }

    async index(): Promise<Array<StarWarsFilms>> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .leftJoinAndSelect(`${this.nameQuery}.species`, 'species')
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

    async initializeDatabases(listInterface: Array<IFilm>): Promise<Array<StarWarsFilms | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (film) => await this.initializeDatabase(film)));
    }
    async initializeDatabase(iEntity: IFilm): Promise<StarWarsFilms | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if(!old) {
            const entity = FilmMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
