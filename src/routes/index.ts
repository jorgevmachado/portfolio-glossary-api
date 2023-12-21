import { Router } from 'express';

import pokemonRoutes from './pokemon.routes';
import starWarsRoutes from './starWars.routes';

const routes = Router();

routes.use('/pokemon', pokemonRoutes);
routes.use('/star-wars', starWarsRoutes);

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World super Dev!' });
});

export default routes;
