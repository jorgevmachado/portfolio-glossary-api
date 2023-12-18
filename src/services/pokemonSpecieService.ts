import { type IResponseSpecies, type ISpecie } from '@interfaces/pokemon/species';
import PokemonSpecieRepository from '@repositories/PokemonSpecieRepository';
import PokemonApi from '@api/pokemon.api';

import { PokemonSpecies } from '@entity/PokemonSpecies';

export class PokemonSpecieService {

    async generateDefaultPokemonSpecie(order: number = 0, name: string = ''): Promise<PokemonSpecies | undefined> {
        const repository = new PokemonSpecieRepository();
        const specie = PokemonSpecieService.defaultSpecie(order, name);
        return await repository.initializeDatabase(specie);
    }
    async generatePokemonSpecie(specie: PokemonSpecies){
        const response =  await PokemonApi.getPokemonSpecieByName(specie.name);
        if(!response){
            return specie;
        }
        const repository = new PokemonSpecieRepository();
        const specieEntity = await repository.findById(specie.id);
        if (!specieEntity) {
            return specie;
        }
        const newSpecie = this.responseToInterfaceByEntity(response, specieEntity);
        await repository.save(newSpecie);
        const result = await repository.findById(specie.id);
        if (!result) {
            return specie;
        }
        return result;

    }

    static defaultSpecie(order: number = 0, name: string = ''): ISpecie {
        return {
            id: '0',
            url: '',
            name,
            order,
            is_baby: false,
            shape_url: '',
            color_url: '',
            created_at: new Date(),
            updated_at: undefined,
            deleted_at: undefined,
            shape_name: '',
            color_name: '',
            is_mythical: false,
            habitat_url: '',
            gender_rate: 0,
            habitat_name: '',
            is_legendary: false,
            capture_rate: 0,
            hatch_counter: 0,
            base_happiness: 0,
            generation_url: '',
            generation_name: '',
            growth_rate_url: '',
            growth_rate_name: '',
            forms_switchable: false,
            evolution_chain_url: '',
            has_gender_differences: false,
            evolves_from_species_url: '',
            evolves_from_species_name: '',
        };
    }


    responseToInterfaceByEntity(response: IResponseSpecies, specie: PokemonSpecies): ISpecie {
        if(!response){
            return PokemonSpecieService.defaultSpecie();
        }
        specie.url = response.url;
        specie.name = response.name;
        specie.is_baby = !!response.is_baby;
        specie.shape_url = response.shape?.url || '';
        specie.color_url = response.color?.url || '';
        specie.shape_name = response.shape?.name || '';
        specie.color_name = response.color?.name || '';
        specie.is_mythical = !!response.is_mythical;
        specie.habitat_url = response.habitat?.url || '';
        specie.gender_rate = response.gender_rate || 0;
        specie.habitat_name = response.habitat?.name || '';
        specie.is_legendary = !!response.is_legendary;
        specie.capture_rate = response.capture_rate || 0;
        specie.hatch_counter = response.hatch_counter || 0;
        specie.base_happiness = response.base_happiness || 0;
        specie.generation_url = response.generation?.url || '';
        specie.generation_name = response.generation?.name || '';
        specie.growth_rate_url = response.growth_rate?.url || '';
        specie.growth_rate_name = response.growth_rate?.name  || '';
        specie.forms_switchable = !!response.forms_switchable;
        specie.evolution_chain_url = response.evolution_chain.url || '';
        specie.evolves_from_species_url = response.evolves_from_species?.url || '';
        specie.evolves_from_species_name = response.evolves_from_species?.name || '';
        specie.has_gender_differences = !!response.has_gender_differences;
        specie.updated_at = new Date();
        return specie;

    }
}
