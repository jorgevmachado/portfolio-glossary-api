import { type IResponseEvolutions } from '@interfaces/pokemon/evolutions';
import { type IPokemon } from '@interfaces/pokemon/pokemon';
import PokemonApi from '@api/pokemon.api';
import PokemonRepository from '@repositories/pokemon/PokemonRepository';
import { BaseService } from '@base/baseService';

import { Pokemon } from '@entity/Pokemon';



export class PokemonEvolutionService extends BaseService<Pokemon, IPokemon>{

    constructor() {
        const repository = new PokemonRepository();
        super(repository);
    }
    async generatePokemonEvolution(evolution_chain_url: string): Promise<Array<Pokemon>> {
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
                const pokemon = await this.repository.findByName(name);
                return !pokemon ?  undefined : pokemon;
            })
        );
        const evolutions = list.filter((item) => !!item) as Array<Pokemon>;
        if(!evolutions.length) {
            return [] as Array<Pokemon>;
        }
        return evolutions;
    }

    private getNextEvolutions(evolvesTo: IResponseEvolutions['chain']['evolves_to']): Array<string> {
        return evolvesTo
            .map((item) => [item.species.name]
                .concat(...this.getNextEvolutions(item.evolves_to)))
            .reduce((arr, curr) => [...arr, ...curr], []);
    }

}
