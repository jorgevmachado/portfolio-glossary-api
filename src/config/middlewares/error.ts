import { NextFunction, Request, Response } from 'express';

import AppError from '../errors';

export default function errorsMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
    const responseError = {
        statusCode: 500,
        status: error.name,
        message: 'Internal server error',
    };
    if (error instanceof AppError) {
        responseError.statusCode = error.statusCode;
        responseError.message = error.message;
    }
    console.error('error => ', error);
    return response
        .status(responseError.statusCode)
        .json({ status: responseError.status, message: responseError.message });
}
