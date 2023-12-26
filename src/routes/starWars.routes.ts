import { Router } from 'express';
import StarWarsController from '@controllers/starWarsController';


const starWarsRoutes = Router();
const controller = new StarWarsController();

starWarsRoutes.get('/characters', controller.characters);
starWarsRoutes.get('/characters/:name', controller.showCharacter);
starWarsRoutes.get('/films', controller.films);
starWarsRoutes.get('/generate', controller.generate);


export default starWarsRoutes;
