import { Pokemon } from '../entity/Pokemon';
import { type IResponseEvolutions } from '../interfaces/pokemon/evolutions';

import PokemonApi from '../api/pokemon.api';
import PokemonRepository from '../repositories/PokemonRepository';

export class PokemonEvolutionService {
    async generatePokemonEvolution(evolution_chain_url: string): Promise<Array<Pokemon>> {
        const pokemonRepository = new PokemonRepository();
        const response = await PokemonApi.getPokemonByUrl(evolution_chain_url) as IResponseEvolutions | null;
        if (!response) {
            return [] as Array<Pokemon>;
        }
        const name = response.chain.species.name;
        const evolvesToList = [
            name,
            ...this.getNextEvolutions(response.chain.evolves_to)
        ];

        if(!evolvesToList.length) {
            return [];
        }

        const list = await Promise.all(
            evolvesToList.map(async (name) => {
                const pokemon = await pokemonRepository.findByName(name);
                return !pokemon ?  undefined : pokemon;
            })
        );
        const evolutions = list.filter((item) => !!item) as Array<Pokemon>;
        if(!evolutions.length) {
            return [] as Array<Pokemon>;
        }
        return evolutions;
    }

    private getNextEvolutions(evolvesTo: IResponseEvolutions['chain']['evolves_to']): any {
        return evolvesTo
            .map((item) => [item.species.name]
                .concat(...this.getNextEvolutions(item.evolves_to)))
            .reduce((arr, curr) => [...arr, ...curr], []);
    }

}
