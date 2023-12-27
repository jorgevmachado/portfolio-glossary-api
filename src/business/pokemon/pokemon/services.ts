import { IResponsePokemon, Pokemon as Api } from '@api/pokemon';
import { BaseService } from '@base/service';
import { IPokemon } from '@business/pokemon';
import { IResponseMessage } from '@base/interface/interface';

import { Pokemon } from '@entity/Pokemon';

import PokemonRepository from './repository';
import PokemonMapper from './mapper';
import { SpecieService } from '../specie';
import { StatService } from '../stat';
import { TypeService } from '../type';
import { MoveService } from '../move';
import { AbilityService } from '../ability';
import { FormService } from '../form';
import { EvolutionService } from '../evolution';


export class PokemonService extends BaseService<Pokemon, IPokemon> {
    constructor() {
        const repository = new PokemonRepository();
        super(repository);
    }

    async generate(): Promise<IResponseMessage> {
        const result = await this.index();
        if(result.length) {
            return { message: 'Base Pokemons already generated!'};
        }
        const responses = new Api();
        const response = await responses.getPokemonsBase(1302, 0);
        if(!response) {
            return { message: 'Error When Querying External Api Please Try Again Later!'};
        }
	    const listInterface = response.results.map((item) => PokemonMapper.baseResponseToInterface(item));
	    const listEntities = await this.repository.initializeDatabases(listInterface);
	    if(!listEntities) {
		    return { message: 'Unable to generate base pokemon list!'};
	    }
	    const filterListEntities: Array<Pokemon> = listEntities.filter((item) => item !== undefined) as Array<Pokemon>;
	    if(!filterListEntities) {
            return { message: 'Unable to generate base pokemon list!'};
	    }
        return { message: 'List of Base Pokemons successfully generated!'};
    }

    async index(): Promise<Array<Pokemon>> {
        return await this.repository.index();
    }

    async show(query: string): Promise<Pokemon | undefined> {
        const result = await this.repository.findByNameOrId(query);
        if(!result) {
            return;
        }

        if(result.complete) {
            return result;
        }

        return await this.generateOne(result);
    }

    private async generateOne(data: Pokemon): Promise<Pokemon> {
        const responses = new Api();
        const response = await responses.getPokemonByName(data.name);
        if(!response) {
            return data;
        }
        data.image = this.getImage(response.sprites);
        data.weight = response.weight;
        data.height = response.height;
        data.base_experience = response.base_experience;

        const specieService = new SpecieService();
        const specie = await specieService.generate(response.species);
        if(specie) {
            data.specie = specie;
            const evolutionsService = new EvolutionService();
            data.evolutions = await evolutionsService.generate(specie.evolution_chain_url);
        }

        const statService = new StatService();
        data.stats = await statService.generate(response.stats);

        const typeService = new TypeService();
        data.types = await typeService.generate(response.types);

        const moveService = new MoveService();
        data.moves = await moveService.generate(response.moves);

        const abilityService = new AbilityService();
        data.abilities = await abilityService.generate(response.abilities);

        const formService = new FormService();
        const form = await formService.generate(response.forms);
        if(form) {
            data.form = form;
        }

        data.complete = this.isComplete(data);

        const iEntity = PokemonMapper.interfaceToEntity(data, true);
        const entity = await this.repository.create(iEntity);
        if(!entity) {
            return data;
        }
        return entity;
    }

    private getImage(sprites: IResponsePokemon['sprites']) {
        if(!sprites) {
            return '';
        }
        const frontDefault = sprites.front_default;
        const dreamWorld = sprites.other.dream_world.front_default;
        return dreamWorld || frontDefault;
    }

    private isComplete(data: Pokemon): boolean {
        const specie = data.specie;
        const stats = data.stats;
        const types = data.types;
        const moves = data.moves;
        const abilities = data.abilities;
        const form = data.form;
        if(!specie && !form){
            return false;
        }
        return stats.length > 0 && types.length > 0 && moves.length > 0 && abilities.length > 0;
    }
}
