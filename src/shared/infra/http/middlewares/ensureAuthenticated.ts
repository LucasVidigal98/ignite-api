import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UserTokensRepository } from '@modules/user/infra/typeorm/repositories/UserTokensRepository';

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');
  
  try{
    const { sub: user_id } = verify(
      token, 
      auth.secret_token
    ) as { sub: string };

    request.user = {
      id: user_id
    }

    next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}