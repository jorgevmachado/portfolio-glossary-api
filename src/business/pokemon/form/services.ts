import { BaseService } from '@base/service/service';
import { type IResponsePokemon, Pokemon as Api } from '@api/pokemon';
import { generateOrder } from '@services/string';

import { PokemonForm } from '@entity/PokemonForm';

import { type IForm } from './interfaces';
import FormRepository from './repository';
import FormMapper from './mapper';


export class FormService extends BaseService<PokemonForm, IForm> {
    constructor() {
        const repository = new FormRepository();
        super(repository);
    }

    async generate(data: IResponsePokemon['forms']): Promise<PokemonForm | undefined> {
        const listItem = data.filter((item) => item !== undefined);
        const item = listItem[0];
        const result = await this.repository.findByName(item.name);
        if(!result) {
            const order = generateOrder(item.url, FormMapper.urlDefault);
            const responses = new Api();
            const response = await responses.getPokemonFormByOrder(order);
            if(!response) {
                return;
            }
            response.url = item.url;
            const iEntity = FormMapper.responseToInterface(response);
            return await this.repository.initializeDatabase(iEntity);
        }
        return result;
    }
}
