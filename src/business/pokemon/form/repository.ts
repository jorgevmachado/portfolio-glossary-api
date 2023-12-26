import { BaseRepository } from '@base/repository';

import { PokemonForm } from '@entity/PokemonForm';

import { type IForm } from './interfaces';
import FormMapper from './mapper';
import { AppDataSource } from '../../../data-source';

export default class FormRepository extends BaseRepository<PokemonForm, IForm> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonForm);
        super(repository, 'pokemons_forms');
    }

    async initializeDatabase(iEntity: IForm): Promise<PokemonForm | undefined> {
        const old = await this.findByName(iEntity.name);
        if (!old) {
            const entity = FormMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByName(iEntity.name);
        }
        return old;
    }
}
