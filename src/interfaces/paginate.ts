
export interface IPaginate<T> {
	total: number;
	pages: number;
	currentPage: number;
	perPage: number;
	next: number | null;
	prev: number | null;
	data: Array<T>;
}

export interface IInitializePaginate {
	total: number;
	pages: number;
	currentPage: number;
	perPage: number;
	next: number | null;
	prev: number | null;
	skip: number;
}
