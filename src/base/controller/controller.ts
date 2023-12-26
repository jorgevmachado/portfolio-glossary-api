import { Response } from 'express';
import { ObjectLiteral } from 'typeorm';
import { type IPaginate } from '@base/paginate';

export interface IController<T extends ObjectLiteral> {
	responseResult(data: Array<T> | T | IPaginate<T> | undefined, response: Response): Response;
}
