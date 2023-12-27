import { Router } from 'express';
import UserController from '@controllers/userController';
import { celebrate, Joi, Segments } from 'celebrate';

const userRoutes = Router();
const controller = new UserController();

userRoutes.get('/', controller.index);
userRoutes.post(
    '/signup',
    celebrate({
	    [Segments.BODY]: Joi.object().keys({
		    name: Joi.string().required(),
		    email: Joi.string().required().email(),
		    phone: Joi.string().optional(),
		    mobile: Joi.string().required(),
		    password: Joi.string().required().min(8),
		    password_confirmation: Joi.string().required(),
		    birthday: Joi.string().required(),
		    admin: Joi.boolean().optional(),

	    }),
    }),
    controller.signup,
);
export default userRoutes;
