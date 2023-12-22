import { BaseService } from '@base/baseService';
import { type IType } from '@pokemon/type/interfaces';
import TypeRepository from '@pokemon/type/repository';
import TypeMapper from '@pokemon/type/mapper';
import { IResponsePokemon } from '@api/pokemon';

import { PokemonTypes } from '@entity/PokemonType';

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
