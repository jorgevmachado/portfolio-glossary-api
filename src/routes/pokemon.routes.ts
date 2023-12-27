import { Router } from 'express';
import PokemonController from '@controllers/pokemonController';
import { celebrate, Joi, Segments } from 'celebrate';
import authMiddleware from '@config/middlewares/auth';

const pokemonRoutes = Router();
const controller = new PokemonController();

pokemonRoutes.use(authMiddleware);

pokemonRoutes.get('/', controller.index);
pokemonRoutes.get('/generate-base', controller.generateBase);
pokemonRoutes.get(
    '/:param',
    authMiddleware,
    celebrate({
	    [Segments.PARAMS]: {
            param: Joi.string().required(),
	    }
    }),
    controller.show
);

export default pokemonRoutes;
