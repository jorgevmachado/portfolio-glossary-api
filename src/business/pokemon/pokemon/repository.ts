import { BaseRepository } from '@base/repository';

import { Pokemon } from '@entity/Pokemon';

import { type IPokemon } from './interfaces';
import PokemonMapper from './mapper';
import { AppDataSource } from '../../../data-source';

export default class PokemonRepository extends BaseRepository<Pokemon, IPokemon> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(Pokemon);
        super(repository, 'pokemons');
    }

    async create(entity: Pokemon): Promise<Pokemon | undefined> {
        await this.save(entity);
        return await this.findByName(entity.name);
    }

    async index(): Promise<Array<Pokemon>> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .leftJoinAndSelect(`${this.nameQuery}.specie`, 'specie')
            .leftJoinAndSelect(`${this.nameQuery}.stats`, 'stats')
            .leftJoinAndSelect(`${this.nameQuery}.moves`, 'moves')
            .leftJoinAndSelect(`${this.nameQuery}.abilities`, 'abilities')
            .leftJoinAndSelect(`${this.nameQuery}.form`, 'form')
            .leftJoinAndSelect(`${this.nameQuery}.evolutions`, 'evolutions')
            .orderBy(`${this.nameQuery}.order`)
            .getMany();
        if(!data) {
            return [];
        }
        return data;
    }

    async findById(id: string): Promise<Pokemon | undefined> {
        if(this.isUUID(id)) {
            const data = await this.repository
                .createQueryBuilder(this.nameQuery)
                .leftJoinAndSelect(`${this.nameQuery}.specie`, 'specie')
                .leftJoinAndSelect(`${this.nameQuery}.stats`, 'stats')
                .leftJoinAndSelect(`${this.nameQuery}.moves`, 'moves')
                .leftJoinAndSelect(`${this.nameQuery}.abilities`, 'abilities')
                .leftJoinAndSelect(`${this.nameQuery}.form`, 'form')
                .leftJoinAndSelect(`${this.nameQuery}.evolutions`, 'evolutions')
                .andWhere(`${this.nameQuery}.id = :id`, { id })
                .getOne();
            if(!data){
                return;
            }
            return data;
        }
        return;
    }

    async findByOrder(order: number): Promise<Pokemon | undefined> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .leftJoinAndSelect(`${this.nameQuery}.specie`, 'specie')
            .leftJoinAndSelect(`${this.nameQuery}.stats`, 'stats')
            .leftJoinAndSelect(`${this.nameQuery}.moves`, 'moves')
            .leftJoinAndSelect(`${this.nameQuery}.abilities`, 'abilities')
            .leftJoinAndSelect(`${this.nameQuery}.form`, 'form')
            .leftJoinAndSelect(`${this.nameQuery}.evolutions`, 'evolutions')
            .andWhere(`${this.nameQuery}.order = :order`, { order })
            .getOne();
        if (!data) {
            return;
        }
        return data;
    }

    async findByName(name: string): Promise<Pokemon | undefined> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .leftJoinAndSelect(`${this.nameQuery}.specie`, 'specie')
            .leftJoinAndSelect(`${this.nameQuery}.stats`, 'stats')
            .leftJoinAndSelect(`${this.nameQuery}.moves`, 'moves')
            .leftJoinAndSelect(`${this.nameQuery}.abilities`, 'abilities')
            .leftJoinAndSelect(`${this.nameQuery}.form`, 'form')
            .leftJoinAndSelect(`${this.nameQuery}.evolutions`, 'evolutions')
            .andWhere(`${this.nameQuery}.name = :name`, { name })
            .getOne();
        if (!data) {
            return;
        }
        return data;
    }

    async initializeDatabases(listInterface: Array<IPokemon>): Promise<Array<Pokemon | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (pokemon) => await this.initializeDatabase(pokemon)));
    }

    async initializeDatabase(iEntity: IPokemon): Promise<Pokemon | undefined> {
        const old = await this.findByOrder(iEntity.order);
        if(!old) {
            const entity = PokemonMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByOrder(iEntity.order);
        }
        return old;
    }
}
