import { Router } from 'express';

import pokemonRoutes from './pokemon.routes';

const routes = Router();

routes.use('/pokemon', pokemonRoutes);

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World super Dev!' });
});

export default routes;
