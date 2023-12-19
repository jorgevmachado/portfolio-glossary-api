import { IResponseSpecies, ISpecie } from '@interfaces/pokemon/species';

import { PokemonSpecies } from '@entity/PokemonSpecies';

export default class PokemonSpecieMapper {
    public static interfaceToEntity(item: ISpecie): PokemonSpecies {
        const entity = new PokemonSpecies();
	    entity.url = item.url;
	    entity.name = item.name;
	    entity.is_baby = item.is_baby;
	    entity.shape_url = item.shape_url;
	    entity.color_url = item.color_url;
	    entity.shape_name = item.shape_name;
	    entity.color_name = item.color_name;
	    entity.is_mythical = item.is_mythical;
	    entity.habitat_url = item.habitat_url;
	    entity.gender_rate = item.gender_rate;
	    entity.habitat_name = item.habitat_name;
	    entity.is_legendary = item.is_legendary;
	    entity.capture_rate = item.capture_rate;
	    entity.hatch_counter = item.hatch_counter;
	    entity.base_happiness = item.base_happiness;
	    entity.generation_url = item.generation_url;
	    entity.generation_name = item.generation_name;
	    entity.growth_rate_url = item.growth_rate_url;
	    entity.growth_rate_name = item.growth_rate_name;
	    entity.forms_switchable = item.forms_switchable;
	    entity.evolution_chain_url = item.evolution_chain_url;
	    entity.evolves_from_species_url = item.evolves_from_species_url;
	    entity.evolves_from_species_name = item.evolves_from_species_name;
	    entity.has_gender_differences = item.has_gender_differences;
	    entity.updated_at = new Date();
        return entity;
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

    public static responseToInterfaceByEntity(response: IResponseSpecies, specie: PokemonSpecies) {
        if(!response) {
            return PokemonSpecieMapper.defaultSpecie();
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
