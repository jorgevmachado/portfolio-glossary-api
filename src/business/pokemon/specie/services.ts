import { BaseService } from '@base/service/service';
import { type IResponsePokemon, Pokemon as Api } from '@api/pokemon';

import { PokemonSpecie } from '@entity/PokemonSpecie';

import { type ISpecie } from './interfaces';
import SpecieRepository from './repository';
import SpecieMapper from './mapper';


export class SpecieService extends BaseService<PokemonSpecie, ISpecie> {
    constructor() {
        const repository = new SpecieRepository();
        super(repository);
    }

    async generate(data: IResponsePokemon['species']): Promise<PokemonSpecie | undefined> {
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
