import { type IAbility } from '@interfaces/pokemon/ability';
import PokemonAbilityMapper from '@mapper/pokemon/pokemonAbilityMapper';
import { BaseRepository } from '@base/baseRepository';

import { PokemonAbility } from '@entity/PokemonAbility';

import { AppDataSource } from '../../data-source';

export default class PokemonAbilityRepository extends BaseRepository<PokemonAbility, IAbility>{
    constructor() {
        const repository = AppDataSource.manager.getRepository(PokemonAbility);
        super(repository, 'pokemons_ability');
    }
    public async initializeDatabase(newAbility: IAbility): Promise<PokemonAbility | undefined> {
        const old = await this.findByName(newAbility.name);
        if(!old) {
            const entity = PokemonAbilityMapper.interfaceToEntity(newAbility);
            await this.save(entity);
            const result = await this.findByName(entity.name);
            return !result ? undefined : result;
        }
        return old;
    }
}
