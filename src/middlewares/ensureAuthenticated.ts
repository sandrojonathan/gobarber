import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authCOnfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const { secret } = authCOnfig.jwt;

  // Bearer token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;
    request.user = { id: sub };
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
