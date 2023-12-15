import { IResponsePokemon, IResponsePokemonBase } from '../interfaces/pokemon/pokemon';
import { IResponseSpecies } from '../interfaces/pokemon/species';

export default class PokemonApi {
	static urlDefault = 'https://pokeapi.co/api/v2';

	static async getPokemons(limit: string, offset: string): Promise<IResponsePokemonBase> {
		return fetch(`${PokemonApi.urlDefault}/pokemon?offset=${offset}&limit=${limit}`, {}).then(async (response) => {
			const status = response.status;
			if (status !== 200) {
				return {
					count: 0,
					next: '',
					previous: '',
					results: []
				};
			}
			return await response.json() as IResponsePokemonBase;
		});
	}

	static async getPokemonByName(name: string): Promise<IResponsePokemon | undefined> {
		return fetch(`${PokemonApi.urlDefault}/pokemon/${name}`, {}).then(async (response) => {
			const status = response.status;
			if (status !== 200) {
				return;
			}
			return await response.json() as IResponsePokemon;
		});
	}

	static async getPokemonByUrl(url: string) {
		return fetch(url, {}).then(async (response) => {
			const status = response.status;
			if (status !== 200) {
				return null;
			}
			return await response.json();
		});
	}

	static async getPokemonSpecieByName(name: string): Promise<IResponseSpecies | undefined> {
		return fetch(`${PokemonApi.urlDefault}/pokemon-species/${name}`, {}).then(async (response) => {
			const status = response.status;
			if (status !== 200) {
				return;
			}
			return await response.json() as IResponseSpecies;
		});
	}
}
