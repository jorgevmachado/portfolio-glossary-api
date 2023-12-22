import { BaseService } from '@base/baseService';
import { type ISpecie } from '@pokemon/specie/interfaces';
import SpecieRepository from '@pokemon/specie/repository';
import { type IResponsePokemon, Pokemon as Api } from '@api/pokemon';
import SpecieMapper from '@pokemon/specie/mapper';

import { PokemonSpecies } from '@entity/PokemonSpecies';

export class SpecieService extends BaseService<PokemonSpecies, ISpecie> {
    constructor() {
        const repository = new SpecieRepository();
        super(repository);
    }

    async generate(data: IResponsePokemon['species']): Promise<PokemonSpecies | undefined> {
        const result = await this.repository.findByName(data.name);
        if (!result) {
            const responses = new Api();
            const response = await responses.getPokemonSpecieByName(data.name);
            if(!response) {
                return;
            }
            response.url = data.url;
            const iEntity = SpecieMapper.responseToInterface(response);
            return await this.repository.initializeDatabase(iEntity);
        }
        return result;
    }
}
