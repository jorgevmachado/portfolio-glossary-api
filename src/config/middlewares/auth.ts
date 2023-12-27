import { NextFunction, Request, Response } from 'express';

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ message: 'Token not provided' });
    }

    const [, token] = authorization.split(' ');

    try {
        // const decoded = verify(token, authConfig.jwt.secret);
        // const { sub } = decoded as TokenPayload;

        // request.user = {
        //     id: sub,
        // };

        return next();
    } catch {
        return response.status(401).json({ message: 'Invalid JWT token' });
    }
}
