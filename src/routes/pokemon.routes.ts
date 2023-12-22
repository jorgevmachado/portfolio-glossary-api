import { Router } from 'express';
import PokemonController from '@controllers/pokemonController';

const pokemonRoutes = Router();
const controller = new PokemonController();

pokemonRoutes.get('/', controller.index);
pokemonRoutes.get('/generate-base', controller.generateBase);
pokemonRoutes.get('/:param', controller.show);

export default pokemonRoutes;
