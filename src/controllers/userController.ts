import { Request, Response } from 'express';
import { UserService } from '@business/auth/user';

export default class UserController {

    async index(request: Request, response: Response): Promise<Response> {
        const service = new UserService();
        const data = await service.index();
        return response.json(data);
    }
    async signup(request: Request, response: Response): Promise<Response> {
        const service = new UserService();
        const { name , admin, email, phone, mobile, password, birthday } = request.body;
        const data = await service.signup({ name , admin, email, phone, mobile, password, birthday });
        return response.json(data);
    }
}
