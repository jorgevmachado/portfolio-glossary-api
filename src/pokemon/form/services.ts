import { BaseService } from '@base/baseService';
import { type IForm } from '@pokemon/form/interfaces';
import FormRepository from '@pokemon/form/repository';
import { type IResponsePokemon, Pokemon as Api } from '@api/pokemon';
import FormMapper from '@pokemon/form/mapper';
import { generateOrder } from '@services/string';

import { PokemonForm } from '@entity/PokemonForm';

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
