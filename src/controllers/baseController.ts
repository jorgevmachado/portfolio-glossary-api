import { IController } from '@interfaces/controller';
import { ObjectLiteral } from 'typeorm';
import { Response } from 'express';
import { type IPaginate } from '@interfaces/paginate';

export class BaseController<T extends  ObjectLiteral> implements IController<T> {
    responseResult(data: Array<T> | T | IPaginate<T> | undefined, response: Response): Response {
        if(!data) {
            return response.status(404).json({
                message: 'Not found',
            });
        }
        return response.json(data);
    }
}
