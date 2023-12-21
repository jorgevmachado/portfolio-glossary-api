import { IAbility, type IResponseAbility } from '@interfaces/pokemon/ability';
import PokemonAbilityRepository from '@repositories/pokemon/PokemonAbilityRepository';
import PokemonAbilityMapper from '@mapper/pokemon/pokemonAbilityMapper';
import { BaseService } from '@base/baseService';

import { PokemonAbility } from '@entity/PokemonAbility';



export class PokemonAbilityService extends BaseService<PokemonAbility, IAbility> {
    constructor() {
        const repository = new PokemonAbilityRepository();
        super(repository);
    }
    async generatePokemonAbility(response: IResponseAbility) : Promise<PokemonAbility | undefined> {
        const  newAbility= PokemonAbilityMapper.responseToInterface(response);
        return await this.repository.initializeDatabase(newAbility);
    }

    async generatePokemonAbilities(responseAbilities: Array<IResponseAbility>) {
        const abilities = await Promise.all(
            responseAbilities.map(async (ability: IResponseAbility) => await this.generatePokemonAbility(ability))
        );
        return abilities.filter(abilities => abilities !== undefined) as Array<PokemonAbility>;
    }
}
