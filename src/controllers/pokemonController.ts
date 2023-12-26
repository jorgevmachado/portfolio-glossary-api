import { Request, Response } from 'express';
import { PokemonService } from '@business/pokemon';

export default class PokemonController {

    async generateBase(request: Request, response: Response): Promise<Response> {
        const service = new PokemonService();
        const pokemonBase = await service.generate();
        return response.json({
            pokemonBase:  !pokemonBase ? 'Unable to generate base pokemon list!' : 'List of Base Pokemons successfully generated!',
        });
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { param } = request.params;
        const service = new PokemonService();
        const data = await service.show(param);
        return response.json(data);
    }

    async index(request: Request, response: Response): Promise<Response> {
        const service = new PokemonService();
        const data = await service.index();
        return response.json(data);
    }
}
