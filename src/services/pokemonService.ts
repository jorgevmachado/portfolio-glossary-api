import PokemonRepository from '../repositories/PokemonRepository';
import { IPokemon, IPokemonBase, IResponsePokemon, IResponsePokemonBase } from '../interfaces/pokemon/pokemon';
import { Pokemon } from '../entity/Pokemon';
import PokemonApi from '../api/pokemon.api';
import { PokemonSpecieService } from './pokemonSpecieService';
import { ISpecie } from '../interfaces/pokemon/species';
import { PokemonStatService } from './pokemonStatService';
import { IResponseStat } from '../interfaces/pokemon/stat';
import { PokemonStats } from '../entity/PokemonStats';
import { IResponseType } from '../interfaces/pokemon/type';
import { PokemonTypeService } from './pokemonTypeService';
import { PokemonTypes } from '../entity/PokemonType';
import { PokemonAbilityService } from './pokemonAbilityService';
import { IResponseAbility } from '../interfaces/pokemon/ability';
import { PokemonAbility } from '../entity/PokemonAbility';
import { PokemonEvolutionService } from './pokemonEvolutionService';
import { IResponseMove } from '../interfaces/pokemon/move';
import PokemonMoveService from './pokemonMoveService';
import { PokemonMove } from '../entity/PokemonMove';

export class PokemonService {
	async index() {
		const repository = new PokemonRepository();
		return repository.index();
	}

	private generateOrder(url: string): number {
		return Number(url
			.replace('https://pokeapi.co/api/v2/pokemon/', '')
			.replace('/', ''));
	}
	private mapperResponseBaseToInterface(
		response: IPokemonBase,
		order: number,
		specie: ISpecie,
	): IPokemon {
		return {
			id: '0',
			name: response.name,
			url: response.url,
			order: order,
			specie,
			created_at: new Date(),
		};
	}
	async generatePokemons(limit: string, offset: string) {
		const list = await PokemonApi.getPokemons(limit, offset) as IResponsePokemonBase;
		return await Promise.all(list.results.map(async (item: IPokemonBase) => {
			const repository = new PokemonRepository();
			const speciesService = new PokemonSpecieService();
			const statService = new PokemonStatService();
			const order = this.generateOrder(item.url);
			const specie = await speciesService.generateDefaultPokemonSpecie(order, item.name);
			if(!specie) {
				return;
			}
			const pokemon = this.mapperResponseBaseToInterface(item, order, specie);
			return await repository.initializeDatabase(pokemon);
		}));
	}

	async show(param: string) {
		const repository = new PokemonRepository();
		const data = await repository.findByNameOrId(param);
		if(!data){
			return;
		}
		return await this.generatePokemonByName(data);
	}

	private async generatePokemonByName(pokemon: Pokemon) {
		if(!pokemon.image && !pokemon.weight && !pokemon.height && !pokemon.base_experience){
			const response = await PokemonApi.getPokemonByName(pokemon.name);
			if(!response){
				return pokemon;
			}
			const specieService = new PokemonSpecieService();
			const statService = new PokemonStatService();
			const typeService = new PokemonTypeService();
			const abilityService = new PokemonAbilityService();
			const evolutionService = new PokemonEvolutionService();
			const moveService = new PokemonMoveService();
			const repository = new PokemonRepository();
			pokemon.image = this.getImage(response.sprites);
			pokemon.weight = response.weight;
			pokemon.height = response.height;
			pokemon.base_experience = response.base_experience;
			pokemon.specie = await specieService.generatePokemonSpecie(pokemon.specie);
			pokemon.stats = await statService.generatePokemonStats(response.stats);
			pokemon.types = await typeService.generatePokemonTypes(response.types);
			pokemon.abilities = await abilityService.generatePokemonAbilities(response.abilities);
			pokemon.evolutions = await evolutionService.generatePokemonEvolution(pokemon.specie.evolution_chain_url);
			pokemon.moves = await moveService.generatePokemonMoves(response.moves);
			return await repository.create(pokemon);
		}
		return pokemon;
	}

	private getImage(sprites: IResponsePokemon['sprites']) {
		if (!sprites) {
			return '';
		}
		const frontDefault = sprites.front_default;
		const dreamWorld = sprites.other.dream_world.front_default;
		return dreamWorld || frontDefault;
	}
}
