import { Request, Response } from 'express';
import { PokemonService } from '../services/pokemonService';
// import { PokemonService } from '../services/pokemonService';
// import { PokemonGenerateService } from '../services/pokemonGenerateService';

export default class PokemonController {
	async index(request: Request, response: Response): Promise<Response> {
		const service = new PokemonService();
		const data  = await service.index();
		return response.json(data);
	}

	async show(request: Request, response: Response): Promise<Response> {
		const { param } = request.params;
		const service = new PokemonService();
		const data = await service.show(param);
		return response.json(data);
	}

	async generate(request: Request, response: Response): Promise<Response> {
		const {limit = '20', offset = '0' } = request.query;
		const service = new PokemonService();
		const data  = await service.generatePokemons(limit as string, offset as string);
		return response.json(data);
	}


}
