import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Defining a custom interface to extend the Express Request
export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Expected format: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'your_super_secret_key';

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token is invalid or expired' });
      }

      // Attach the user info to the request object for use in controllers
      req.user = decoded as { id: number; role: string };
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization header missing' });
  }
};
