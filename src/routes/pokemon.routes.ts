import { Router } from 'express';
import PokemonController from '@controllers/pokemonController';

const pokemonRoutes = Router();
const controller = new PokemonController();

pokemonRoutes.get('/', controller.index);
pokemonRoutes.get('/generate', controller.generate);
pokemonRoutes.get('/:param', controller.show);

export default pokemonRoutes;
