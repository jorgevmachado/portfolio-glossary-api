import { Request, Response } from 'express';
import { PokemonService } from '../services/pokemonService';

export default class PokemonController {
	async index(request: Request, response: Response): Promise<Response> {
		const page = Number(request.query.page || '0');
		const perPage = Number(request.query.perPage || '10');
		const isPaginate = request.query.isPaginate;
		const limit =  Number(request.query.limit || '1292');
		const offset =  Number(request.query.offset || '0');
		const service = new PokemonService();
		if(isPaginate === 'false') {
			const data  = await service.index(limit, offset);
			return response.json(data);
		}
		const data = await service.paginate(page, perPage, limit, offset);
		return response.json(data);

	}

	async show(request: Request, response: Response): Promise<Response> {
		const { param } = request.params;
		const service = new PokemonService();
		const data = await service.show(param);
		return response.json(data);
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
		return response.json(data);
	}


}
