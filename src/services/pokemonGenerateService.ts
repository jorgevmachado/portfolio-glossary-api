// import { IPokemon, IPokemonBase, IResponsePokemon, IResponsePokemonBase } from '../interfaces/pokemon/pokemon';
// import { IResponseSpecies, ISpecies } from '../interfaces/pokemon/species';
// import { IResponseEvolutions } from '../interfaces/pokemon/evolutions';
// import { Pokemon } from '../entity/Pokemon';
// import PokemonTypesRepository from '../repositories/PokemonTypesRepository';
// import PokemonSpecieRepository from '../repositories/PokemonSpecieRepository';
// import PokemonRepository from '../repositories/PokemonRepository';
// import { PokemonBusiness } from '../business/pokemonBusiness';
// import { PokemonTypeBusiness } from '../business/PokemonTypeBusiness';
// import { PokemonAbilityBusiness } from '../business/PokemonAbilityBusiness';
// import PokemonAbilityRepository from '../repositories/PokemonAbilityRepository';
// import { PokemonSpeciesBusiness } from '../business/PokemonSpeciesBusiness';
// import PokemonStatsRepository from '../repositories/PokemonStatsRepository';
// import { PokemonStatsBusiness } from '../business/PokemonStatsBusiness';
// import PokemonGameIndexRepository from '../repositories/PokemonGameIndexRepository';
// import { PokemonGameIndexBusiness } from '../business/PokemonGameIndexBusiness';
// import PokemonMoveRepository from '../repositories/PokemonMoveRepository';
// import { PokemonMoveBusiness } from '../business/PokemonMoveBusiness';
// import { PokemonVersionGroupDetailsRepository } from '../repositories/PokemonVersionGroupDetailsRepository';
// import { PokemonMove } from '../entity/PokemonMove';
//
// export class PokemonGenerateService {
//
// 	async getPokemons(limit: string, offset: string) {
// 		return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`, {}).then(async (response) => {
// 			const status = response.status;
// 			if (status !== 200) {
// 				return {
// 					count: 0,
// 					next: '',
// 					previous: '',
// 					results: []
// 				};
// 			}
// 			return await response.json();
// 		});
// 	}
// 	async getPokemonByName(name: string) {
// 		return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {}).then(async (response) => {
// 			const status = response.status;
// 			if (status !== 200) {
// 				return null;
// 			}
// 			return await response.json() as IResponsePokemon;
// 		});
// 	}
//
// 	async getPokemonByNameSpecies(name: string) {
// 		return fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`, {}).then(async (response) => {
// 			const status = response.status;
// 			if (status !== 200) {
// 				return;
// 			}
// 			return await response.json() as IResponseSpecies;
// 		});
// 	}
//
// 	async getPokemonByUrl(url: string) {
// 		return fetch(url, {}).then(async (response) => {
// 			const status = response.status;
// 			if (status !== 200) {
// 				return null;
// 			}
// 			return await response.json();
// 		});
// 	}
// 	async generatePokemons(limit: string, offset: string) {
// 		const list = await this.getPokemons(limit, offset) as IResponsePokemonBase;
// 		const data = await Promise.all(list.results.map(async (item: IPokemonBase) => {
// 			const pokemon = await this.getPokemonByName(item.name);
// 			return pokemon ? await this.generatePokemon(pokemon, true) : undefined;
// 		}));
// 		const results = data.filter((item) => !!item) as Array<IPokemon>;
// 		await this.generateDatabasePokemon(results);
// 		return {
// 			...list,
// 			results,
// 		};
// 	}
//
// 	private async getPokemonEvolutions(species?: ISpecies) {
// 		if(!species) {
// 			return;
// 		}
// 		const evolutionChainUrl = species.evolution_chain_url || '';
// 		const evolutions = await this.getPokemonByUrl(evolutionChainUrl) as IResponseEvolutions | null;
// 		if (!evolutions) {
// 			return;
// 		}
// 		const evolutionsChain = evolutions.chain;
// 		const name = evolutionsChain.species.name;
// 		const evolvesTo = evolutionsChain.evolves_to;
// 		const evolvesToList = [
// 			name,
// 			...this.getNextEvolutions(evolvesTo)
// 		];
// 		if (!evolvesToList.length) {
// 			return [];
// 		}
// 		const evolutionsList = await Promise.all(evolvesToList.map(async (item) => {
// 			const pokemon = await this.getPokemonByName(item);
// 			if (!pokemon) {
// 				return;
// 			}
// 			return await this.generatePokemon(pokemon);
// 		}));
// 		const pokemonEvolutions: Array<IPokemon> = evolutionsList.filter((item) => !!item) as Array<IPokemon>;
// 		if (!pokemonEvolutions.length) {
// 			return [];
// 		}
// 		return pokemonEvolutions;
// 	}
//
// 	private getNextEvolutions(evolvesTo: IResponseEvolutions['chain']['evolves_to']): any {
// 		return evolvesTo
// 			.map((item) => [item.species.name]
// 				.concat(...this.getNextEvolutions(item.evolves_to)))
// 			.reduce((arr, curr) => [...arr, ...curr], []);
// 	}
// 	private async generatePokemon(item: IResponsePokemon, withEvolutions: boolean = false) {
// 		const species = await this.generatePokemonSpecies(item.name);
// 		// const evolutions = withEvolutions ? await this.getPokemonEvolutions(species) as Array<IPokemon> : [] as Array<IPokemon>;
// 		return PokemonBusiness.mapperGenerate({
// 			types: PokemonTypeBusiness.mapperListResponse(item.types),
// 			stats: PokemonStatsBusiness.mapperListInterface(item.stats),
// 			species,
// 			moves: PokemonMoveBusiness.mapperListInterface(item.moves),
// 			abilities: PokemonAbilityBusiness.mapperListInterface(item.abilities),
// 			game_indices: PokemonGameIndexBusiness.mapperListInterface(item.game_indices),
// 			responsePokemon: item,
// 		});
// 	}
//
// 	private async generatePokemonSpecies(name: string) {
// 		const resultSpecies = await this.getPokemonByNameSpecies(name);
// 		if(!resultSpecies) {
// 			return PokemonSpeciesBusiness.interfaceDefault();
// 		}
// 		return PokemonSpeciesBusiness.mapperResponse(resultSpecies);
// 	}
// 	private async initializePokemonTypesDatabase(pokemonTypes: IPokemon['types']) {
// 		const types = [];
// 		for (const type of pokemonTypes) {
// 			const repository = new PokemonTypesRepository();
// 			const newPokemonType = await repository.initializeDatabase(type);
// 			if (newPokemonType) {
// 				types.push(newPokemonType);
// 			}
// 		}
// 		return types;
// 	}
//
// 	private async initializePokemonSpeciesDatabase(species: IPokemon['species']) {
// 		const repository = new PokemonSpecieRepository();
// 		return await repository.initializeDatabase(species);
// 	}
//
// 	private async initializePokemonAbilityDatabase(pokemonAbilities: IPokemon['abilities']) {
// 		const abilities = [];
// 		for (const ability of pokemonAbilities) {
// 			const repository = new PokemonAbilityRepository();
// 			const newPokemonAbility = await repository.initializeDatabase(ability);
// 			if (newPokemonAbility) {
// 				abilities.push(newPokemonAbility);
// 			}
// 		}
// 		return abilities;
// 	}
//
// 	private async initializePokemonStatsDatabase(pokemonStats: IPokemon['stats']) {
// 	   const stats = [];
// 	   for (const stat of pokemonStats) {
// 		   const repository = new PokemonStatsRepository();
// 		   const newPokemonStat = await repository.initializeDatabase(stat);
// 		   if (newPokemonStat) {
// 			   stats.push(newPokemonStat);
// 		   }
// 	   }
// 	   return stats;
// 	}
//
// 	private async initializePokemonGameIndexDatabase(pokemonGameIndex: IPokemon['game_indices']) {
// 		const gameIndexes = [];
// 		for (const gameIndex of pokemonGameIndex) {
// 			const repository = new PokemonGameIndexRepository();
// 			const newPokemonGameIndex = await repository.initializeDatabase(gameIndex);
// 			if (newPokemonGameIndex) {
// 				gameIndexes.push(newPokemonGameIndex);
// 			}
// 		}
// 		return gameIndexes;
// 	}
//
// 	private async initializePokemonMoveDatabase(pokemonMove: IPokemon['moves']): Promise<Array<PokemonMove>> {
// 		const moves = [];
// 		for (const move of pokemonMove) {
// 			await this.initializePokemonVersionGroupDetails(move.version_group_details);
// 			const repository = new PokemonMoveRepository();
// 			const newPokemonMove = await repository.initializeDatabase(move);
// 			if (newPokemonMove) {
// 				moves.push(newPokemonMove);
// 			}
// 		}
// 		return moves;
// 	}
//
// 	private async initializePokemonVersionGroupDetails(pokemonVersionGroupDetails: IPokemon['moves'][0]['version_group_details']) {
// 		const versionGroupDetails = [];
// 		for (const versionGroupDetail of pokemonVersionGroupDetails) {
// 			const repository = new PokemonVersionGroupDetailsRepository();
// 			const newPokemonVersionGroupDetail = await repository.initializeDatabase(versionGroupDetail);
// 			if (newPokemonVersionGroupDetail) {
// 				versionGroupDetails.push(newPokemonVersionGroupDetail);
// 			}
// 		}
// 		return versionGroupDetails;
// 	}
//
// 	private async generateDatabasePokemon(pokemons: Array<IPokemon>) {
// 		const newPokemons = [] as Array<Pokemon>;
//
// 		for (const pokemon of pokemons) {
// 			const types = await this.initializePokemonTypesDatabase(pokemon.types);
// 			const species =  await this.initializePokemonSpeciesDatabase(pokemon.species);
// 			const abilities = await this.initializePokemonAbilityDatabase(pokemon.abilities);
// 			const stats = await this.initializePokemonStatsDatabase(pokemon.stats);
// 			const gameIndices = await this.initializePokemonGameIndexDatabase(pokemon.game_indices);
// 			const moves = await this.initializePokemonMoveDatabase(pokemon.moves);
// 			if (types) {
// 				pokemon.types = types;
// 			}
// 			if (species) {
// 				pokemon.species = species;
// 			}
// 			if (abilities) {
// 				pokemon.abilities = abilities;
// 			}
// 			if(stats) {
// 				pokemon.stats = stats;
// 			}
// 			if (gameIndices) {
// 				pokemon.game_indices = gameIndices;
// 			}
// 			if (!moves) {
// 				pokemon.moves = [];
// 			}
// 			const repository = new PokemonRepository();
// 			const data = await repository.initializeDatabase(pokemon);
// 			if(data) {
// 				newPokemons.push(data);
// 			}
// 		}
// 		return newPokemons;
// 	}
// }
