import { type IResponseSpecie } from '@api/starWars';
import { generateOrder } from '@services/string';

import { StarWarsNationality } from '@entity/starWarsNationality';

import { type INationality } from './interfaces';

export default class SpecieMapper {
    static urlDefault = 'https://swapi.dev/api/species/';

    static defaultInterface(): INationality {
        return {
            id: 'specie',
	        url: '',
	        name: '',
	        order: 0,
	        language: '',
	        eye_colors: '',
	        designation: '',
	        skin_colors: '',
	        hair_colors: '',
	        classification: '',
	        average_height: '',
	        average_lifespan: '',
            created_at: new Date(),
        };
    }

    static responseToInterface(response: IResponseSpecie): INationality {
        const iEntity = SpecieMapper.defaultInterface();
        iEntity.url = response.url;
        iEntity.name = response.name;
        iEntity.order = generateOrder(response.url, SpecieMapper.urlDefault);
        iEntity.language = response.language;
        iEntity.eye_colors =  response.eye_colors;
        iEntity.designation = response.designation;
        iEntity.skin_colors = response.skin_colors;
        iEntity.hair_colors = response.hair_colors;
        iEntity.classification =  response.classification;
        iEntity.average_height = response.average_height;
        iEntity.average_lifespan = response.average_lifespan;
        return iEntity;
    }

    static interfaceToEntity(iEntity: INationality): StarWarsNationality {
        const entity = new StarWarsNationality();
        entity.url = iEntity.url;
        entity.name = iEntity.name;
        entity.order = iEntity.order;
        entity.language = iEntity.language;
        entity.eye_colors = iEntity.eye_colors;
        entity.designation = iEntity.designation;
        entity.skin_colors = iEntity.skin_colors;
        entity.hair_colors = iEntity.hair_colors;
        entity.classification = iEntity.classification;
        entity.average_height = iEntity.average_height;
        entity.average_lifespan = iEntity.average_lifespan;
        entity.created_at = iEntity.created_at;
        return entity;
    }
}
