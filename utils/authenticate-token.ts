import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({message: 'Brak tokenu autoryzacyjnego.'});
    }

    jwt.verify(token, 'secretKey', (err, decodedToken) => {
        if (err) {
            return res.status(403).json({message: 'Nieprawidłowy token autoryzacyjny.'});
        }
        next();
    });
};
