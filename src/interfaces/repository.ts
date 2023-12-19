import { IInitializePaginate, type IPaginate } from '@interfaces/paginate';

export interface ICurrentProps {
	page: number;
	next: number | null;
	prev: number | null;
}
export interface IRepository<T, I> {
	create(entity: T): Promise<T | undefined>;
	save(entity: T): void;
	initializeDatabase(iEntity: I): Promise<T | undefined>;
	initializePaginate(currentPage: number, perPage: number, total: number): IInitializePaginate;
	current(page: number, pages: number): ICurrentProps;
	paginateSkip(currentPage: number, perPage: number): number;
	paginate(currentPage: number, perPage: number): Promise<IPaginate<T>>;
	index(): Promise<T[]>;
	total(): Promise<number>;
	findById(id: string): Promise<T | undefined>;
	findByName(name: string): Promise<T | undefined>;
	findByNameOrId(param: string): Promise<T | undefined>;
	findByOrder(order: number): Promise<T | undefined>;
	isUUID(id: string): boolean;
}
