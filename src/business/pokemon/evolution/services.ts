import { BaseService } from '@base/service/service';
import { type IResponseEvolution, Pokemon as Api } from '@api/pokemon';
import { generateOrder } from '@services/string';

import { Pokemon } from '@entity/Pokemon';

import EvolutionMapper from './mapper';
import PokemonRepository from '../pokemon/repository';
import { type IPokemon } from '../pokemon';

export class EvolutionService extends BaseService<Pokemon, IPokemon> {
    constructor() {
        const repository = new PokemonRepository();
        super(repository);
    }

    async generate(url: string): Promise<Array<Pokemon>> {
	    const order = generateOrder(url, EvolutionMapper.urlDefault);
	    const responses = new Api();
	    const response = await responses.getPokemonEvolutionsByOrder(order);
        if(!response) {
	        return [] as Array<Pokemon>;
        }
        const name = response.chain.species.name;
        const evolvesToList = [
            name,
            ...this.getNextEvolution(response.chain.evolves_to)
        ];

        if(!evolvesToList.length) {
            return [] as Array<Pokemon>;
        }

        const listEntity = await Promise.all(
            evolvesToList.map(async (name) => {
	            const entity = await this.repository.findByName(name);
                return !entity ? undefined : entity;
            })
        );
        const evolutions = listEntity.filter((item) => !!item) as Array<Pokemon>;
        if(!evolutions.length) {
            return [] as Array<Pokemon>;
        }
        return evolutions;
    }

    private getNextEvolution(evolvesTo: IResponseEvolution['chain']['evolves_to']): Array<string> {
        return evolvesTo.map(
            (item) => [item.species.name]
                .concat(...this.getNextEvolution(item.evolves_to)))
	        .reduce((arr, curr) => [...arr, ...curr] ,
	        []
            );
    }
}
