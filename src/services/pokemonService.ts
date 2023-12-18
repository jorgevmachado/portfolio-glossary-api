import { type IPokemonBase, type IResponsePokemon, type IResponsePokemonBase } from '@interfaces/pokemon/pokemon';
import { PokemonSpecieService } from '@services/pokemonSpecieService';
import { PokemonStatService } from '@services/pokemonStatService';
import { PokemonTypeService } from '@services/pokemonTypeService';
import { PokemonAbilityService } from '@services/pokemonAbilityService';
import { PokemonEvolutionService } from '@services/pokemonEvolutionService';
import { PokemonMoveService } from '@services/pokemonMoveService';
import PokemonApi from '@api/pokemon.api';
import PokemonRepository from '@repositories/PokemonRepository';
import PokemonMapper from '@mapper/pokemonMapper';

import { Pokemon } from '@entity/Pokemon';

interface IGeneratePokemon {
	isPaginate: boolean;
	limit: number;
	offset: number;
	currentPage?: number;
	perPage?: number;
}
export class PokemonService {

    async index(limit: number = 1292, offset: number = 0) {
        const repository = new PokemonRepository();
        const result = await repository.index();
        if(result.length <= 0) {
            return await this.generatePokemons({
                isPaginate: false,
                limit,
                offset,
            });
        }
        return result;
    }

    async paginate(currentPage: number = 0, perPage: number = 10, limit: number = 1292, offset: number = 0) {
        const repository = new PokemonRepository();
        const result = await repository.paginate(currentPage, perPage);
        if (result.total <= 0) {
            return await this.generatePokemons({
                isPaginate: true,
                limit,
                offset,
                currentPage,
                perPage
            });
        }
        return result;
    }

    async generatePokemons({
		                       isPaginate = false,
		                       limit = 1292,
		                       offset = 0,
		                       currentPage = 0,
		                       perPage = 10
	                       }: IGeneratePokemon) {
        const list = await PokemonApi.getPokemons(limit, offset) as IResponsePokemonBase;
        const repository = new PokemonRepository();
        const result = await Promise.all(list.results.map(async (item: IPokemonBase) => {
            const speciesService = new PokemonSpecieService();
            const order = this.generateOrder(item.url);
            const specie = await speciesService.generateDefaultPokemonSpecie(order, item.name);
            if(!specie) {
                return;
            }
            const pokemon = PokemonMapper.responseBaseToInterface(item, order, specie);
            return await repository.initializeDatabase(pokemon);
        }));
        if(!isPaginate){
            return result;
        }
        const total = result.length;
        const pages = Math.ceil(total / perPage);
        const current = repository.current(currentPage, pages);
        return {
            total,
            pages,
            currentPage: current.page,
            perPage,
            next: current.next,
            prev: current.prev,
            data: result.filter(item => item !== undefined) as Array<Pokemon>
        };
    }

    async show(param: string) {
        const repository = new PokemonRepository();
        const data = await repository.findByNameOrId(param);
        if(!data){
            return;
        }
        return await this.generatePokemonByName(data);
    }

    private generateOrder(url: string): number {
        return Number(url
            .replace('https://pokeapi.co/api/v2/pokemon/', '')
            .replace('/', ''));
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
