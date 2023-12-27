import { Router } from 'express';

import pokemonRoutes from './pokemon.routes';
import starWarsRoutes from './starWars.routes';
import usersRoutes from './user.routes';
const routes = Router();

routes.use('/pokemon', pokemonRoutes);
routes.use('/star-wars', starWarsRoutes);
routes.use('/users', usersRoutes);

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World super Dev!' });
});

export default routes;
