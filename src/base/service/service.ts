import { ObjectLiteral } from 'typeorm';
import { type IPaginate } from '@base/paginate';
import { type IRepository } from '@base/repository';

export interface IService<T> {
    index(limit?: number, offset?: number): Promise<Array<T>>;
    paginate(currentPage: number, perPage: number, limit: number, offset: number): Promise<IPaginate<T>>;
    show(query: string): Promise<T | undefined>;
}

export class BaseService<T extends ObjectLiteral, I> implements IService<T> {

    constructor(protected repository: IRepository<T, I>) {}
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
