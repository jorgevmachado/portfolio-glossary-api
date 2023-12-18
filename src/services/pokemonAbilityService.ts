import { type IResponseAbility } from '@interfaces/pokemon/ability';
import PokemonAbilityRepository from '@repositories/PokemonAbilityRepository';
import PokemonAbilityMapper from '@mapper/pokemonAbilityMapper';

import { PokemonAbility } from '@entity/PokemonAbility';

export class PokemonAbilityService {
    async generatePokemonAbility(response: IResponseAbility) : Promise<PokemonAbility | undefined> {
        const repository = new PokemonAbilityRepository();
        const  newAbility= PokemonAbilityMapper.responseToInterface(response);
        return await repository.initializeDatabase(newAbility);
    }

    async generatePokemonAbilities(responseAbilities: Array<IResponseAbility>) {
        const abilities = await Promise.all(
            responseAbilities.map(async (ability: IResponseAbility) => await this.generatePokemonAbility(ability))
        );
        return abilities.filter(abilities => abilities !== undefined) as Array<PokemonAbility>;
    }
}
