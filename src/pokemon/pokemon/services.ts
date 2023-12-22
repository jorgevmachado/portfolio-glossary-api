import { BaseService } from '@base/baseService';
import { type IPokemon } from '@interfaces/pokemon/pokemon';
import PokemonRepository from '@pokemon/pokemon/repository';
import PokemonMapper from '@pokemon/pokemon/mapper';
import { IResponsePokemon, Pokemon as Api } from '@api/pokemon';
import { SpecieService } from '@pokemon/specie';
import { StatService } from '@pokemon/stat';
import { TypeService } from '@pokemon/type';
import { MoveService } from '@pokemon/move';
import { AbilityService } from '@pokemon/ability';
import { FormService } from '@pokemon/form';
import { EvolutionService } from '@pokemon/evolution';

import { Pokemon } from '@entity/Pokemon';

export class PokemonService extends BaseService<Pokemon, IPokemon> {
    constructor() {
        const repository = new PokemonRepository();
        super(repository);
    }

    async generate(): Promise<Array<Pokemon> | undefined> {
        const result = await this.index();
        if(result.length) {
            return result;
        }
        const responses = new Api();
        const response = await responses.getPokemonsBase(1302, 0);
        if(!response) {
            return;
        }
	    const listInterface = response.results.map((item) => PokemonMapper.baseResponseToInterface(item));
	    const listEntities = await this.repository.initializeDatabases(listInterface);
	    if(!listEntities) {
		    return;
	    }
	    const filterListEntities: Array<Pokemon> = listEntities.filter((item) => item !== undefined) as Array<Pokemon>;
	    if(!filterListEntities) {
		    return [];
	    }
        return filterListEntities;
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
