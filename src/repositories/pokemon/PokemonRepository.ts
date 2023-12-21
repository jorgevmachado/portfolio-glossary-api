import { type IPokemon } from '@interfaces/pokemon/pokemon';
import { type IPaginate } from '@interfaces/paginate';
import { BaseRepository } from '@base/baseRepository';

import { Pokemon } from '@entity/Pokemon';

import { AppDataSource } from '../../data-source';

export default class PokemonRepository extends BaseRepository<Pokemon, IPokemon>{

    public relations = ['specie', 'stats', 'types', 'abilities', 'evolutions', 'moves'];
    constructor() {
        const repository = AppDataSource.manager.getRepository(Pokemon);
        super(repository, 'pokemon');
    }

    async create(pokemon: Pokemon): Promise<Pokemon | undefined> {
        await this.save(pokemon);
        const data = await this.findByOrder(pokemon.order);
        if(!data) {
            return;
        }
        return data;
    }

    public async initializeDatabase(pokemon: IPokemon): Promise<Pokemon | undefined> {
        const old  = await this.findByOrder(pokemon.order);
        if (!old) {
            const newPokemon = new Pokemon();
            newPokemon.name = pokemon.name;
            newPokemon.url = pokemon.url;
            newPokemon.order = pokemon.order;
            newPokemon.specie = pokemon.specie;
            newPokemon.created_at = new Date();
            await this.save(newPokemon);
            return await this.findByOrder(newPokemon.order);
        }
        return old;
    }

    async paginate(currentPage: number = 0, perPage: number = 10): Promise<IPaginate<Pokemon>> {
        const total = await this.total();
        const initialize = this.initializePaginate(currentPage, perPage, total);
        const data = await AppDataSource
            .manager
            .getRepository(Pokemon)
            .createQueryBuilder('pokemon')
            .leftJoinAndSelect('pokemon.specie', 'specie')
            .leftJoinAndSelect('pokemon.stats', 'stats')
            .leftJoinAndSelect('pokemon.types', 'types')
            .leftJoinAndSelect('pokemon.abilities', 'abilities')
            .leftJoinAndSelect('pokemon.evolutions', 'evolutions')
            .leftJoinAndSelect('pokemon.moves', 'moves')
            .orderBy('pokemon.order', 'ASC')
            .skip(initialize.skip)
            .take(initialize.perPage)
            .getMany();
        const result = data.filter((item) => item !== undefined) as Array<Pokemon>;
        return {
            total,
            pages: initialize.pages,
            currentPage: initialize.currentPage,
            perPage: initialize.perPage,
            next: initialize.next,
            prev: initialize.prev,
            data: result,
        };
    }

    public async index() {
        return await AppDataSource
            .manager.find(Pokemon, {
                relations: this.relations,
                order: {
                    order: 'ASC',
                }
            });
    }

    async findById(id: string): Promise<Pokemon | undefined> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .leftJoinAndSelect(`${this.nameQuery}.specie`, 'specie')
            .leftJoinAndSelect(`${this.nameQuery}.stats`, 'stats')
            .leftJoinAndSelect(`${this.nameQuery}.types`, 'types')
            .leftJoinAndSelect(`${this.nameQuery}.abilities`, 'abilities')
            .leftJoinAndSelect(`${this.nameQuery}.evolutions`, 'evolutions')
            .leftJoinAndSelect(`${this.nameQuery}.moves`, 'moves')
            .andWhere(`${this.nameQuery}.id = :id`, { id })
            .getOne();
        if(!data){
            return;
        }
        return data;
    }

    async findByName(name: string): Promise<Pokemon | undefined> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .leftJoinAndSelect(`${this.nameQuery}.specie`, 'specie')
            .leftJoinAndSelect(`${this.nameQuery}.stats`, 'stats')
            .leftJoinAndSelect(`${this.nameQuery}.types`, 'types')
            .leftJoinAndSelect(`${this.nameQuery}.abilities`, 'abilities')
            .leftJoinAndSelect(`${this.nameQuery}.evolutions`, 'evolutions')
            .leftJoinAndSelect(`${this.nameQuery}.moves`, 'moves')
            .andWhere(`${this.nameQuery}.name = :name`, { name })
            .getOne();
        if (!data) {
            return;
        }
        return data;
    }

    async findByOrder(order: number): Promise<Pokemon | undefined> {
        const data = await this.repository
            .createQueryBuilder(this.nameQuery)
            .leftJoinAndSelect(`${this.nameQuery}.specie`, 'specie')
            .leftJoinAndSelect(`${this.nameQuery}.stats`, 'stats')
            .leftJoinAndSelect(`${this.nameQuery}.types`, 'types')
            .leftJoinAndSelect(`${this.nameQuery}.abilities`, 'abilities')
            .leftJoinAndSelect(`${this.nameQuery}.evolutions`, 'evolutions')
            .leftJoinAndSelect(`${this.nameQuery}.moves`, 'moves')
            .andWhere(`${this.nameQuery}.order = :order`, { order })
            .getOne();
        if (!data) {
            return;
        }
        return data;
    }
}
