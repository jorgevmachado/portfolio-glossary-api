import { Response } from 'express';
import { IPaginate } from '@interfaces/paginate';
import { ObjectLiteral } from 'typeorm';

export interface IController<T extends ObjectLiteral> {
	responseResult(data: Array<T> | T | IPaginate<T> | undefined, response: Response): Response;
}
