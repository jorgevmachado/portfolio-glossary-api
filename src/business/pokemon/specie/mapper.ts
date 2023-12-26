import { type IResponsePokemonBase, type IResponseSpecies } from '@api/pokemon';
import { generateOrder } from '@services/string';

import { PokemonSpecie } from '@entity/PokemonSpecie';

import { ISpecie } from './interfaces';

export default class SpecieMapper {
    static urlDefault = 'https://pokeapi.co/api/v2/pokemon-species/';

    static defaultInterface(): ISpecie {
        return {
            id: 'pokemon',
            url: '',
            name: '',
            order: 0,
            is_baby: false,
            shape_url: '',
            color_url: '',
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
            created_at: new Date(),
        };
    }

    static baseResponseToInterface(response: IResponsePokemonBase): ISpecie {
        const iEntity = SpecieMapper.defaultInterface();
        iEntity.url = response.url;
        iEntity.name = response.name;
        iEntity.order = generateOrder(response.url, SpecieMapper.urlDefault);
        return iEntity;
    }

    static responseToInterface(response: IResponseSpecies): ISpecie {
        const iEntity = SpecieMapper.defaultInterface();
        iEntity.url = response.url;
        iEntity.name = response.name;
        iEntity.order = generateOrder(response.url, SpecieMapper.urlDefault);
        iEntity.is_baby = response.is_baby;
        iEntity.shape_url =  response.shape.url;
        iEntity.color_url =  response.color.url;
        iEntity.shape_name =  response.shape.name;
        iEntity.color_name =  response.color.name;
        iEntity.is_mythical =  response.is_mythical;
        iEntity.habitat_url =  response.habitat.url;
        iEntity.gender_rate =  response.gender_rate;
        iEntity.habitat_name =  response.habitat.name;
        iEntity.is_legendary =  response.is_legendary;
        iEntity.capture_rate =  response.capture_rate;
        iEntity.hatch_counter =  response.hatch_counter;
        iEntity.base_happiness =  response.base_happiness;
        iEntity.generation_url =  response.generation.url;
        iEntity.generation_name =  response.generation.name;
        iEntity.growth_rate_url =  response.growth_rate.url;
        iEntity.growth_rate_name =  response.growth_rate.name;
        iEntity.forms_switchable =  response.forms_switchable;
        iEntity.evolution_chain_url =  response.evolution_chain.url;
        iEntity.evolves_from_species_url = response.evolves_from_species?.url;
        iEntity.evolves_from_species_name = response.evolves_from_species?.name;
        iEntity.has_gender_differences = response.has_gender_differences;
        return iEntity;
    }

    static interfaceToEntity(iEntity: ISpecie): PokemonSpecie {
        const entity = new PokemonSpecie();
        entity.url = iEntity.url;
        entity.name = iEntity.name;
        entity.order = iEntity.order;
        entity.is_baby = iEntity.is_baby;
        entity.shape_url =  iEntity.shape_url;
        entity.color_url =  iEntity.color_url;
        entity.shape_name =  iEntity.shape_name;
        entity.color_name =  iEntity.color_name;
        entity.is_mythical =  iEntity.is_mythical;
        entity.habitat_url =  iEntity.habitat_url;
        entity.gender_rate =  iEntity.gender_rate;
        entity.habitat_name =  iEntity.habitat_name;
        entity.is_legendary =  iEntity.is_legendary;
        entity.capture_rate =  iEntity.capture_rate;
        entity.hatch_counter =  iEntity.hatch_counter;
        entity.base_happiness =  iEntity.base_happiness;
        entity.generation_url =  iEntity.generation_url;
        entity.generation_name =  iEntity.generation_name;
        entity.growth_rate_url =  iEntity.growth_rate_url;
        entity.growth_rate_name =  iEntity.growth_rate_name;
        entity.forms_switchable =  iEntity.forms_switchable;
        entity.evolution_chain_url =  iEntity.evolution_chain_url;
        entity.evolves_from_species_url =  iEntity.evolves_from_species_url;
        entity.evolves_from_species_name =  iEntity.evolves_from_species_name;
        entity.has_gender_differences =  iEntity.has_gender_differences;
        entity.created_at =  new Date();
        return entity;
    }

}
