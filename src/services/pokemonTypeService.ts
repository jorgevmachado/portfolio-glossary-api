import { type IResponseType, type IType } from '@interfaces/pokemon/type';
import PokemonTypesRepository from '@repositories/PokemonTypesRepository';
import PokemonTypeMapper from '@mapper/pokemonTypeMapper';
import { BaseService } from '@services/baseService';

import { PokemonTypes } from '@entity/PokemonType';

export class PokemonTypeService extends BaseService<PokemonTypes, IType>{

    constructor() {
        const repository = new PokemonTypesRepository();
        super(repository);
    }

    async generatePokemonType(response: IResponseType): Promise<PokemonTypes | undefined> {
        const newType = PokemonTypeMapper.responseToInterface(response);
        return await this.repository.initializeDatabase(newType);
    }

    async generatePokemonTypes(responseTypes: Array<IResponseType>) {
        const types = await Promise.all(
            responseTypes.map(async (type: IResponseType) => await this.generatePokemonType(type))
        );
        return types.filter(types => types !== undefined) as Array<PokemonTypes>;
    }
}
