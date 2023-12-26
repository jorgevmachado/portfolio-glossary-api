import { IResponsePokemon } from '@api/pokemon';
import { BaseService } from '@base/service';

import { PokemonTypes } from '@entity/PokemonType';

import { type IType } from './interfaces';
import TypeRepository from './repository';
import TypeMapper from './mapper';


export class TypeService extends BaseService<PokemonTypes, IType> {
    constructor() {
        const repository = new TypeRepository();
        super(repository);
    }

    async generate(types: IResponsePokemon['types']): Promise<Array<PokemonTypes>> {
        const data: Array<PokemonTypes> = [];
        const listInterfaces = types.map((item) => TypeMapper.responseToInterface(item));
	    const listEntities = await this.repository.initializeDatabases(listInterfaces);
	    if(!listEntities) {
		    return data;
	    }
	    const filterListEntities: Array<PokemonTypes> = listEntities.filter(item => item !== undefined) as Array<PokemonTypes>;
	    if(filterListEntities) {
		    data.push(...filterListEntities);
	    }
	    return data;
    }
}
