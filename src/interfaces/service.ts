import { IPaginate } from '@interfaces/paginate';

export interface IService<T> {
	index(limit: number, offset: number): Promise<Array<T>>;
	paginate(currentPage: number, perPage: number, limit: number, offset: number): Promise<IPaginate<T>>;
	show(query: string): Promise<T | undefined>;
}
