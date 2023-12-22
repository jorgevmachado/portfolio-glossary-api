import { IService } from '@interfaces/service';
import { IPaginate } from '@interfaces/paginate';
import { ObjectLiteral } from 'typeorm';

import { BaseRepository } from './baseRepository';

export class BaseService<T extends ObjectLiteral, I> implements IService<T> {

    constructor(protected repository: BaseRepository<T, I>) {}
    async index(limit?: number, offset?: number): Promise<Array<T>> {
        return await this.repository.index();
    }

    async paginate(currentPage: number, perPage: number, limit: number, offset: number): Promise<IPaginate<T>> {
        return await this.repository.paginate(currentPage, perPage);
    }

    async show(query: string): Promise<T | undefined> {
        return await this.repository.findById(query);
    }
}
