import { ObjectLiteral, Repository } from 'typeorm';
import { type IInitializePaginate, type IPaginate } from '@base/paginate';

export interface ICurrentProps {
	page: number;
	next: number | null;
	prev: number | null;
}
export interface IRepository<T, I> {
	create(entity: T): Promise<T | undefined>;
	save(entity: T): void;
	transformReceiveData(entity: T): T;
	initializeDatabases(listInterface: Array<I>): Promise<Array<T | undefined> | undefined>;
	initializeDatabase(iEntity: I): Promise<T | undefined>;
	initializePaginate(currentPage: number, perPage: number, total: number): IInitializePaginate;
	current(page: number, pages: number): ICurrentProps;
	paginateSkip(currentPage: number, perPage: number): number;
	paginate(currentPage: number, perPage: number): Promise<IPaginate<T>>;
	index(): Promise<T[]>;
	total(): Promise<number>;
	findById(id: string): Promise<T | undefined>;
	findByName(name: string): Promise<T | undefined>;
	findByEmail(email: string): Promise<T | undefined>;
	findByNameOrId(param: string): Promise<T | undefined>;
	findByOrder(order: number): Promise<T | undefined>;
	findByUrl(url: string): Promise<T | undefined>;
	isUUID(id: string): boolean;
}

export class BaseRepository<T extends ObjectLiteral, I> implements IRepository<T, I> {

    constructor(protected repository: Repository<T>, protected nameQuery: string ) {}

    transformReceiveData(entity: T): T {
        return entity;
    }
    async save(entity: T) {
        const data = await this.repository.save(entity);
        if (!data) {
            throw new Error('Error to save entity');
        }
        return this.transformReceiveData(data);
    }
    async create(entity: T): Promise<T | undefined> {
        await this.save(entity);
        const data = await this.findById(entity.id);
        if(!data) {
            return;
        }
        return this.transformReceiveData(data);
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
	    if(this.isUUID(id)) {
		    const data = await this.repository
			    .createQueryBuilder(this.nameQuery)
			    .andWhere(`${this.nameQuery}.id = :id`, { id })
			    .getOne();
		    if(!data){
			    return;
		    }
		    return this.transformReceiveData(data);
	    }
        return;
    }

    async findByName(name: string): Promise<T | undefined> {
        const data = await this.repository
	        .createQueryBuilder(this.nameQuery)
	        .andWhere(`${this.nameQuery}.name = :name`, { name })
	        .getOne();
        if (!data) {
            return;
        }
        return this.transformReceiveData(data);
    }

    async findByNameOrId(param: string): Promise<T | undefined> {
        const entity = await this.findByName(param);
        if(entity) {
            return entity;
        }
	    return await this.findById(param);
    }

    async findByOrder(order: number): Promise<T | undefined> {
        const data = await this.repository
	        .createQueryBuilder(this.nameQuery)
	        .andWhere(`${this.nameQuery}.order = :order`, { order })
	        .getOne();
        if (!data) {
            return;
        }
        return this.transformReceiveData(data);
    }

    async findByUrl(url: string): Promise<T | undefined> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .andWhere(`${this.nameQuery}.url = :url`, { url })
            .getOne();
        if (!data) {
            return;
        }
	    return this.transformReceiveData(data);
    }

    async findByEmail(email: string): Promise<T | undefined> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .andWhere(`${this.nameQuery}.email = :email`, { email })
            .getOne();
        if (!data) {
            return;
        }
	    return this.transformReceiveData(data);
    }

    async index(): Promise<T[]> {
        const data = await this.repository.createQueryBuilder(this.nameQuery).getMany();
        if(!data) {
            return [];
        }
        return data.map((item) => this.transformReceiveData(item));
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
