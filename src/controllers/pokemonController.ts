import { Request, Response } from 'express';
import { PokemonService } from '@services/pokemon/pokemonService';
import { IPaginate } from '@interfaces/paginate';

import { Pokemon } from '@entity/Pokemon';

export default class PokemonController {

    static responseResult(data: Array<Pokemon> | Pokemon | IPaginate<Pokemon> | undefined, response: Response): Response {
        if(!data) {
            return response.status(404).json({
                message: 'Not found',
            });
        }
        return response.json(data);
    }
    async index(request: Request, response: Response): Promise<Response> {
        const page = Number(request.query.page || '0');
        const perPage = Number(request.query.perPage || '10');
        const isPaginate = request.query.isPaginate;
        const limit =  Number(request.query.limit || '1292');
        const offset =  Number(request.query.offset || '0');
        const service = new PokemonService();
        if(isPaginate === 'true') {
            const data = await service.paginate(page, perPage, limit, offset);
            return PokemonController.responseResult(data, response);
        }
        const data  = await service.index(limit, offset);
        return PokemonController.responseResult(data, response);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { param } = request.params;
        const service = new PokemonService();
        const data = await service.show(param);
        return PokemonController.responseResult(data, response);
    }

    async generate(request: Request, response: Response): Promise<Response> {
        const limit =  Number(request.query.limit || '1292');
        const offset =  Number(request.query.offset || '0');
        const service = new PokemonService();
        const data  = await service.generatePokemons({
            isPaginate: false,
            limit,
            offset
        });
        return PokemonController.responseResult(data, response);
    }


}
