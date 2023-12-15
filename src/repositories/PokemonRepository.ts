import { IPokemon, IPokemonBase } from '../interfaces/pokemon/pokemon';
import { AppDataSource } from '../data-source';
import { Pokemon } from '../entity/Pokemon';

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
		const old  = await AppDataSource.manager.findOne(Pokemon, { where: { order: pokemon.order } });
		if (!old) {
			const newPokemon = new Pokemon();
			newPokemon.name = pokemon.name;
			newPokemon.url = pokemon.url;
			newPokemon.order = pokemon.order;
			newPokemon.specie = pokemon.specie;
			newPokemon.created_at = new Date();
			await this.save(newPokemon);
			return await AppDataSource.manager.findOne(Pokemon, { where: { order: newPokemon.order } });
		}
		return old;
	}

	public async index() {
		return await AppDataSource.manager.find(
			Pokemon, {
				relations: this.relations,
				order: { order: 'ASC' }
			}
		);
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
}
