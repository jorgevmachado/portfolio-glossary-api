import { Request, Response } from 'express';
import { FilmService } from '@business/starWars/film';
import { PersonService } from '@business/starWars/person';
import { StarWarsService } from '@business/starWars/starWars';

export default class StarWarsController {

    async generate(request: Request, response: Response): Promise<Response> {
        const service = new StarWarsService();
        const  data = await service.generate();
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
