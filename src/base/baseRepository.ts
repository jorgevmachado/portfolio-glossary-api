import { ObjectLiteral, Repository } from 'typeorm';
import { ICurrentProps, IRepository } from '@interfaces/repository';
import { IInitializePaginate, IPaginate } from '@interfaces/paginate';

export class BaseRepository<T extends ObjectLiteral, I> implements IRepository<T, I> {

    constructor(protected repository: Repository<T>, protected nameQuery: string ) {}
    async save(entity: T) {
        return await this.repository.save(entity);
    }
    async create(entity: T): Promise<T | undefined> {
        await this.save(entity);
        return await this.findById(entity.id);
    }

    async initializeDatabase(iEntity: I): Promise<T | undefined> {
        return Promise.resolve(undefined);
    }

    current(page: number, pages: number): ICurrentProps {
        const paginate: ICurrentProps = {
            page: 0,
            next: null,
            prev: null,
        };
        if (page === 0) {
            paginate.page = 1;
            paginate.next = 2;
            paginate.prev = null;
            return paginate;
        }
        if(page >= pages) {
            paginate.page = pages;
            paginate.next = null;
            paginate.prev = pages - 1;
            return paginate;
        }
        paginate.page = page;
        paginate.next = page + 1;
        paginate.prev = page - 1;
        return paginate;
    }

    paginateSkip(currentPage: number, perPage: number): number {
        if(currentPage === 1) {
            return 0;
        }
        if(currentPage === 2) {
            return perPage;
        }
        return (currentPage * perPage) - perPage;
    }

    initializePaginate(currentPage: number, perPage: number, total: number): IInitializePaginate {
	    const pages = Math.ceil(total / perPage);
	    const current = this.current(currentPage, pages);
	    const skip = this.paginateSkip(current.page, perPage);
	    return {
		    total,
		    pages,
		    currentPage: current.page,
		    perPage,
		    next: current.next,
		    prev: current.prev,
		    skip,
	    };
    }

    async paginate(currentPage: number, perPage: number): Promise<IPaginate<T>> {
	    const total = await this.total();
        const initialize = this.initializePaginate(currentPage, perPage, total);
	    return {
		    total,
		    pages: initialize.pages,
		    currentPage: initialize.currentPage,
		    perPage: initialize.perPage,
		    next: initialize.next,
		    prev: initialize.prev,
		    data: [],
	    };
    }

    async findById(id: string): Promise<T | undefined> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .andWhere(`${this.nameQuery}.id = :id`, { id })
            .getOne();
        if(!data){
            return;
        }
        return data;
    }

    async findByName(name: string): Promise<T | undefined> {
        const data = await this.repository
	        .createQueryBuilder(this.nameQuery)
	        .andWhere(`${this.nameQuery}.name = :name`, { name })
	        .getOne();
        if (!data) {
            return;
        }
        return data;
    }

    async findByNameOrId(param: string): Promise<T | undefined> {
        const entity = await this.findByName(param);
        if(entity) {
            return entity;
        }
	    if(this.isUUID(param)) {
		    return await this.findById(param);
	    }
	    return;
    }

    async findByOrder(order: number): Promise<T | undefined> {
        const data = await this.repository
	        .createQueryBuilder(this.nameQuery)
	        .andWhere(`${this.nameQuery}.order = :order`, { order })
	        .getOne();
        if (!data) {
            return;
        }
        return data;
    }

    async findByUrl(url: string): Promise<T | undefined> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .andWhere(`${this.nameQuery}.url = :url`, { url })
            .getOne();
        if (!data) {
            return;
        }
        return data;
    }

    async index(): Promise<T[]> {
        const data = await this.repository.createQueryBuilder(this.nameQuery).getMany();
        if(!data) {
            return [];
        }
        return data;
    }

    async total(): Promise<number> {
        return await this.repository.createQueryBuilder(this.nameQuery).getCount();
    }

    isUUID(id: string): boolean {
        const regex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        return regex.test(id);
    }

    async initializeDatabases(listInterface: Array<I | undefined>): Promise<Array<T | undefined> | undefined> {
        return;
    }
}
