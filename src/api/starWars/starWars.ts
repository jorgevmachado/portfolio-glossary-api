import * as dto from '@api/starWars/interfaces';
import { Http } from '@http/http';

export class StarWars extends Http {
    constructor() {
        super('https://swapi.dev/api', {});
    }

    async getPlanets(page: number): Promise<dto.IResponseStarWarsPaginate<dto.IResponsePlanet> | undefined> {
        return await this.get(`planets?page=${page}`, {});
    }

    async getSpecies(page: number): Promise<dto.IResponseStarWarsPaginate<dto.IResponseSpecie> | undefined> {
        return await this.get(`species?page=${page}`, {});
    }

    async getStarships(page: number): Promise<dto.IResponseStarWarsPaginate<dto.IResponseStarship> | undefined> {
        return await this.get(`starships?page=${page}`, {});
    }

    async getVehicles(page: number): Promise<dto.IResponseStarWarsPaginate<dto.IResponseVehicle> | undefined> {
        return await this.get(`vehicles?page=${page}`, {});
    }

    async getPeoples(page: number): Promise<dto.IResponseStarWarsPaginate<dto.IResponsePerson> | undefined> {
        return await this.get(`people?page=${page}`, {});
    }

    async getFilms(): Promise<dto.IResponseStarWarsPaginate<dto.IResponseFilm> | undefined> {
        return await this.get('films', {});
    }

}
