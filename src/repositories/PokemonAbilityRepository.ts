import { AppDataSource } from '../data-source';
import { PokemonAbility } from '../entity/PokemonAbility';
import { type IAbility } from '../interfaces/pokemon/ability';

import PokemonAbilityMapper from '../mapper/pokemonAbilityMapper';

export default class PokemonAbilityRepository {
	constructor() {}
	public async save(entity: PokemonAbility) {
		return await AppDataSource.manager.save(entity);
	}
	public async findByName(name: string) {
		return await AppDataSource.manager.findOneBy(PokemonAbility, { name });
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
