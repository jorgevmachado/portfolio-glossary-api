import { type ISpecie } from '@interfaces/pokemon/species';
import PokemonSpecieRepository from '@repositories/PokemonSpecieRepository';
import PokemonApi from '@api/pokemon.api';
import { BaseService } from '@services/baseService';
import PokemonSpecieMapper from '@mapper/pokemonSpecieMapper';

import { PokemonSpecies } from '@entity/PokemonSpecies';

export class PokemonSpecieService extends BaseService<PokemonSpecies, ISpecie>{
    constructor() {
        const repository = new PokemonSpecieRepository();
        super(repository);
    }

    async generateDefaultPokemonSpecie(order: number = 0, name: string = ''): Promise<PokemonSpecies | undefined> {
        const specie = PokemonSpecieMapper.defaultSpecie(order, name);
        return await this.repository.initializeDatabase(specie);
    }
    async generatePokemonSpecie(specie: PokemonSpecies){
        const response =  await PokemonApi.getPokemonSpecieByName(specie.name);
        if(!response){
            return specie;
        }
        const specieEntity = await this.repository.findById(specie.id);
        if (!specieEntity) {
            return specie;
        }
        const newSpecie = PokemonSpecieMapper.responseToInterfaceByEntity(response, specieEntity);
        await this.repository.save(newSpecie);
        const result = await this.repository.findById(specie.id);
        if (!result) {
            return specie;
        }
        return result;

    }
}
