import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from '../ciphers';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No authorization token.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid authorization token.' });
    }

    (req as any).parsedToken = decodedToken;
    next();
  });
};
