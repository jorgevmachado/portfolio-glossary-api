import { AppDataSource } from '../data-source';
import { PokemonSpecies } from '../entity/PokemonSpecies';
import { type ISpecie } from '../interfaces/pokemon/species';
export default class PokemonSpecieRepository {
    constructor() {}

    public async save(specie: PokemonSpecies) {
        return await AppDataSource.manager.save(specie);
    }

    async findById(id: string) {
        return await AppDataSource.manager.findOneBy(PokemonSpecies, { id });
    }

    async findByOrder(order: number) {
        return await AppDataSource.manager.findOneBy(PokemonSpecies, { order });
    }

    public async initializeDatabase(specie: ISpecie): Promise<PokemonSpecies | undefined> {
        const pokemonSpecies = new PokemonSpecies();
        pokemonSpecies.url= specie.url;
        pokemonSpecies.name= specie.name;
        pokemonSpecies.order= specie.order;
        pokemonSpecies.is_baby= specie.is_baby;
        pokemonSpecies.shape_url= specie.shape_url;
        pokemonSpecies.color_url= specie.color_url;
        pokemonSpecies.shape_name= specie.shape_name;
        pokemonSpecies.color_name= specie.color_name;
        pokemonSpecies.is_mythical= specie.is_mythical;
        pokemonSpecies.habitat_url= specie.habitat_url;
        pokemonSpecies.habitat_url= specie.habitat_url;
        pokemonSpecies.gender_rate = specie.gender_rate;
        pokemonSpecies.habitat_name= specie.habitat_name;
        pokemonSpecies.is_legendary= specie.is_legendary;
        pokemonSpecies.capture_rate= specie.capture_rate;
        pokemonSpecies.hatch_counter= specie.hatch_counter;
        pokemonSpecies.base_happiness= specie.base_happiness;
        pokemonSpecies.generation_url= specie.generation_url;
        pokemonSpecies.generation_name= specie.generation_name;
        pokemonSpecies.growth_rate_url= specie.growth_rate_url;
        pokemonSpecies.growth_rate_name= specie.growth_rate_name;
        pokemonSpecies.forms_switchable= specie.forms_switchable;
        pokemonSpecies.evolution_chain_url= specie.evolution_chain_url;
        pokemonSpecies.evolves_from_species_url= specie.evolves_from_species_url;
        pokemonSpecies.evolves_from_species_name= specie.evolves_from_species_name;
        pokemonSpecies.has_gender_differences= specie.has_gender_differences;
        pokemonSpecies.created_at = new Date();

        const old = await this.findByOrder(pokemonSpecies.order);
        if(!old) {
            await this.save(pokemonSpecies);
            const result = await this.findByOrder(pokemonSpecies.order);
            return !result ? undefined : result;
        }
        return old;
    }
}
