import { AppDataSource } from '../data-source';
import { IType } from '../interfaces/pokemon/type';
import PokemonTypeMapper from '../mapper/pokemonTypeMapper';
import { PokemonTypes } from '../entity/PokemonType';

export default class PokemonTypesRepository {
	constructor() {}

	public async save(type: PokemonTypes) {
		return await AppDataSource.manager.save(type);
	}

	public async findByName(name: string) {
		return await AppDataSource.manager.findOneBy(PokemonTypes, { name });
	}

	async initializeDatabase(newType: IType): Promise<PokemonTypes | undefined> {
		const old = await this.findByName(newType.name);
		if(!old) {
			const entity = PokemonTypeMapper.interfaceToEntity(newType);
			await this.save(entity);
			const result = await this.findByName(entity.name);
			return !result ? undefined : result;
		}
		return old;
	}
}
