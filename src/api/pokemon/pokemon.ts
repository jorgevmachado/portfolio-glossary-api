import * as dto from '@api/pokemon/interfaces';
import { Http } from 'src/services/http';

export class Pokemon extends Http {
    constructor() {
        super('https://pokeapi.co/api/v2', {});
    }

    async getPokemonsBase(limit: number, offset: number): Promise<dto.IResponsePokemonPaginate<dto.IResponsePokemonBase> | undefined> {
        return await this.get(`pokemon?offset=${offset}&limit=${limit}`, {});
    }

    async getPokemonByName(name: string): Promise<dto.IResponsePokemon | undefined> {
        return await this.get(`pokemon/${name}`, {});
    }

    async getPokemonSpecieByName(name: string): Promise<dto.IResponseSpecies | undefined> {
        return await this.get(`pokemon-species/${name}`, {});
    }

    async getPokemonFormByOrder(order: number): Promise<dto.IResponseForm | undefined> {
        return await this.get( `pokemon-form/${order}`, {});
    }

    async getPokemonEvolutionsByOrder(order: number): Promise<dto.IResponseEvolution | undefined> {
        return await this.get(`evolution-chain/${order}`, {});
    }
}
