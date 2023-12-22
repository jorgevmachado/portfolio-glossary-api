import { Router } from 'express';
import StarWarsController from '@controllers/starWarsController';


const starWarsRoutes = Router();
const controller = new StarWarsController();

starWarsRoutes.get('/characters', controller.characters);
starWarsRoutes.get('/films', controller.films);
starWarsRoutes.get('/generate', controller.generate);
// starWarsRoutes.get('/:param', controller.show);

export default starWarsRoutes;
