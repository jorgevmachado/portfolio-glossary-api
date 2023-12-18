import { PokemonTypes } from '../entity/PokemonType';
import { type IResponseType } from '../interfaces/pokemon/type';

import PokemonTypesRepository from '../repositories/PokemonTypesRepository';
import PokemonTypeMapper from '../mapper/pokemonTypeMapper';

export class PokemonTypeService {

    async generatePokemonType(response: IResponseType): Promise<PokemonTypes | undefined> {
        const repository = new PokemonTypesRepository();
        const newType = PokemonTypeMapper.responseToInterface(response);
        return await repository.initializeDatabase(newType);
    }

    async generatePokemonTypes(responseTypes: Array<IResponseType>) {
        const types = await Promise.all(
            responseTypes.map(async (type: IResponseType) => await this.generatePokemonType(type))
        );
        return types.filter(types => types !== undefined) as Array<PokemonTypes>;
    }
}
