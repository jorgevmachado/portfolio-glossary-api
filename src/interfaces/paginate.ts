export interface IPaginate<T> {
	total: number;
	pages: number;
	currentPage: number;
	perPage: number;
	next: number | null;
	prev: number | null;
	data: Array<T>;
}
