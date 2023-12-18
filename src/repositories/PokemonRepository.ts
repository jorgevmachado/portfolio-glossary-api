import { IPokemon, IPokemonBase } from '../interfaces/pokemon/pokemon';
import { AppDataSource } from '../data-source';
import { Pokemon } from '../entity/Pokemon';
import { IPaginate } from '../interfaces/paginate';

interface IPageProps {
	data: Array<Pokemon>;
	pages: number;
	total: number;
	perPage: number;
	currentPage: number;
}

interface ICurrentProps {
	page: number;
	next: number | null;
	prev: number | null;
}
export default class PokemonRepository {

	public relations = ['specie', 'stats', 'types', 'abilities', 'evolutions', 'moves'];
	constructor() {}

	public async create(pokemon: Pokemon) {
		await this.save(pokemon);
		return this.findByNameOrId(pokemon.name);
	}
	public async save(pokemon: Pokemon) {
		return await AppDataSource.manager.save(pokemon);
	}

	public async initializeDatabase(pokemon: IPokemon) {
		const old  = await this.findByOrder(pokemon.order)
		if (!old) {
			const newPokemon = new Pokemon();
			newPokemon.name = pokemon.name;
			newPokemon.url = pokemon.url;
			newPokemon.order = pokemon.order;
			newPokemon.specie = pokemon.specie;
			newPokemon.created_at = new Date();
			await this.save(newPokemon);
			return await this.findByOrder(newPokemon.order);
		}
		return old;
	}

	current(page: number, pages: number): ICurrentProps {
		const paginate: ICurrentProps = {
			page: 0,
			next: null,
			prev: null,
		}
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
	async paginate(currentPage: number = 0, perPage: number = 10): Promise<IPaginate<Pokemon>> {
		const total = await this.total();
		const pages = Math.ceil(total / perPage);
		const current = this.current(currentPage, pages);
		const skip = this.paginateSkip(current.page, perPage);
		const data = await AppDataSource
			.manager
			.getRepository(Pokemon)
			.createQueryBuilder('pokemon')
			.leftJoinAndSelect('pokemon.specie', 'specie')
			.orderBy('pokemon.order', 'ASC')
			.skip(skip)
			.take(perPage)
			.getMany();
		const result = data.filter((item) => item !== undefined) as Array<Pokemon>;
		return {
			total,
			pages,
			currentPage: current.page,
			perPage,
			next: current.next,
			prev: current.prev,
			data: result,
		}
	}
	public async index() {
		return await AppDataSource
			.manager.find(Pokemon, {
				relations: this.relations,
				order: {
					order: 'ASC',
				}
			});
	}

	public async total() {
		return await AppDataSource
			.manager
			.getRepository(Pokemon)
			.count();
	}

	async findById(id: string) {
		return await AppDataSource.manager.findOne(
			Pokemon,
			{
				where: { id },
				relations: this.relations,
			}
		);
	}

	findByName(name: string) {
		return AppDataSource.manager.findOne(
			Pokemon,
			{
				where: { name },
				relations: this.relations,
			}
		);
	}

	async findByNameOrId(param: string) {
		const pokemon = await this.findByName(param);
		if (pokemon) {
			return pokemon;
		}
		return await this.findById(param);
	}

	async findByOrder(order : number) {
		const pokemon = await AppDataSource.manager
			.getRepository(Pokemon)
			.findOne({ where: { order: order } });
		if(!pokemon) {
			return;
		}
		return pokemon;
	}
}
