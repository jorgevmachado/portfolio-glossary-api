import { type IStarship } from '@starWars/starship/interfaces';
import { BaseRepository } from '@base/baseRepository';
import StarshipMapper from '@starWars/starship/mapper';

import { StarWarsStarship } from '@entity/StarWarsStarship';

import { AppDataSource } from '../../data-source';

export default class StarshipRepository extends BaseRepository<StarWarsStarship, IStarship> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(StarWarsStarship);
        super(repository, 'star_wars_starships');
    }

    async initializeDatabases(listInterface: IStarship[]): Promise<Array<StarWarsStarship | undefined> | undefined> {
        return await Promise.all(listInterface.map(async (starship) => await this.initializeDatabase(starship)));
    }

    async initializeDatabase(iEntity: IStarship): Promise<StarWarsStarship | undefined> {
        const old = await this.findByName(iEntity.name);
        if(!old) {
            const entity = StarshipMapper.interfaceToEntity(iEntity);
            await this.save(entity);
            return await this.findByName(iEntity.name);
        }
        return old;
    }
}
