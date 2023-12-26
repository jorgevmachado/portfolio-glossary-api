import { type IResponsePokemonBase } from '@api/pokemon';
import { generateOrder } from '@services/string';

import { PokemonSpecie } from '@entity/PokemonSpecie';
import { Pokemon } from '@entity/Pokemon';
import { PokemonForm } from '@entity/PokemonForm';

import { type IPokemon } from './interfaces';

export default class PokemonMapper {
    static urlDefault = 'https://pokeapi.co/api/v2/pokemon/';

    static defaultInterface(): IPokemon {
        return {
            id: 'pokemon',
            url: '',
            form: {} as PokemonForm,
            name: '',
            order: 0,
            stats: [],
            image: '',
            moves: [],
            types: [],
            weight: 0,
            height: 0,
            specie: {} as PokemonSpecie,
            complete: false,
            abilities: [],
            evolutions: [],
            base_experience: 0,
            created_at: new Date(),
        };
    }

    static baseResponseToInterface(baseResponse: IResponsePokemonBase): IPokemon {
        const iEntity = PokemonMapper.defaultInterface();
        iEntity.url = baseResponse.url;
        iEntity.form = {} as PokemonForm;
        iEntity.name = baseResponse.name;
        iEntity.order = generateOrder(baseResponse.url, PokemonMapper.urlDefault);
        iEntity.stats = [];
        iEntity.image = '';
        iEntity.moves = [];
        iEntity.types = [];
        iEntity.weight = 0;
        iEntity.height = 0;
        iEntity.specie = {} as PokemonSpecie;
        iEntity.abilities = [];
        iEntity.evolutions = [];
        iEntity.base_experience = 0;
        iEntity.created_at = new Date();
        return iEntity;
    }

    static interfaceToEntity(iEntity: IPokemon, update: boolean = false): Pokemon {
        const entity = new Pokemon();
        entity.url = iEntity.url;
        entity.form = iEntity.form;
        entity.name = iEntity.name;
        entity.order = iEntity.order;
        entity.stats = iEntity.stats;
        entity.image = iEntity.image;
        entity.moves = iEntity.moves;
        entity.types = iEntity.types;
        entity.weight = iEntity.weight;
        entity.height = iEntity.height;
        entity.specie = iEntity.specie;
        entity.complete = iEntity.complete;
        entity.abilities = iEntity.abilities;
        entity.evolutions = iEntity.evolutions;
        entity.base_experience = iEntity.base_experience;
        entity.created_at = iEntity.created_at;
        if(update) {
            entity.id = iEntity.id;
        }
        return entity;
    }

}
