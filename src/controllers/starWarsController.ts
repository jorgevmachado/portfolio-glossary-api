import { Request, Response } from 'express';
import { PlanetService } from '@starWars/planet';
import { SpecieService } from '@starWars/species/service';
import { StarshipService } from '@starWars/starship';
import { VehicleService } from '@starWars/vehicle';
import { PersonService } from '@starWars/person';
import { FilmService } from '@starWars/film';

import { StarWarsPlanet } from '@entity/StarWarsPlanet';
import { StarWarsSpecies } from '@entity/starWarsSpecies';
import { StarWarsStarship } from '@entity/StarWarsStarship';
import { StarWarsVehicle } from '@entity/StarWarsVehicle';
import { StarWarsPerson } from '@entity/StarWarsPerson';
import { StarWarsFilms } from '@entity/StarWarsFilms';

interface IGeneratePerson {
    planets: Array<StarWarsPlanet>;
    species: Array<StarWarsSpecies>;
    starships: Array<StarWarsStarship>;
    vehicles: Array<StarWarsVehicle>;
}

interface IGenerateFilm extends IGeneratePerson {
    characters: Array<StarWarsPerson>;
}
export default class StarWarsController {

    static async generatePlanet(): Promise<Array<StarWarsPlanet> | undefined> {
        const service = new PlanetService();
        return await service.generate();
    }

    static async generateSpecies(): Promise<Array<StarWarsSpecies> | undefined> {
        const service = new SpecieService();
        return await service.generate();
    }

    static async generateStarships(): Promise<Array<StarWarsStarship> | undefined> {
        const service = new StarshipService();
        return await service.generate();
    }

    static async generateVehicles(): Promise<Array<StarWarsVehicle> | undefined> {
        const service = new VehicleService();
        return await service.generate();
    }

    static async generatePerson({ planets, species, starships, vehicles}: IGeneratePerson): Promise<Array<StarWarsPerson> | undefined> {
        const service = new PersonService();
        return await service.generate({ planets, species, starships, vehicles});
    }

    static async generateFilms({ planets, species, starships, vehicles, characters}: IGenerateFilm): Promise<Array<StarWarsFilms> | undefined> {
        const service = new FilmService();
        return await service.generate({ planets, species, starships, vehicles, characters});
    }
    async generate(request: Request, response: Response): Promise<Response> {
        const  data = {
            planet: 'Não foi possível gerar a lista de planetas',
            species: 'Não foi possível gerar a lista de especies',
            vehicles: 'Não foi possível gerar a lista de veiculos',
            starships: 'Não foi possível gerar a lista de starships',
            people: 'Não foi possível gerar a lista de personagens',
            films: 'Não foi possível gerar a lista de filmes',
        };
        const planets = await StarWarsController.generatePlanet();

        if(planets) {
            data.planet = 'Lista de planetas gerada com sucesso';
        }

        const species = await StarWarsController.generateSpecies();
        if(species) {
            data.species = 'Lista de especies gerada com sucesso';
        }

        const starships = await StarWarsController.generateStarships();
        if(starships) {
            data.starships = 'Lista de starships gerada com sucesso';
        }

        const vehicles = await StarWarsController.generateVehicles();
        if(vehicles) {
            data.vehicles = 'Lista de veiculos gerada com sucesso';
        }

        if(planets && species && starships && vehicles) {
            const people = await StarWarsController.generatePerson({ planets, species, starships, vehicles});
            if(people) {
                data.people = 'Lista de personagens gerada com sucesso';
                const films = await StarWarsController.generateFilms({ planets, species, starships, vehicles, characters: people});
                if(films) {
                    data.films = 'Lista de filmes gerada com sucesso';
                }
            }
        }
        return response.json(data);
    }

    async characters(request: Request, response: Response): Promise<Response> {
        const service = new PersonService();
        const data = await service.index();
        return response.json(data);
    }
    async films(request: Request, response: Response): Promise<Response> {
        const service = new FilmService();
        const data = await service.index();
        return response.json(data);
    }
}
