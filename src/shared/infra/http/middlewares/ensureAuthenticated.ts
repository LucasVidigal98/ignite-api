import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');
  
  try{
    const { sub: user_id } = verify(
      token, 
      '16d25979826290c44af324ca0a33b3c9'
    ) as { sub: string };
    const userRepository = new UserRepository();
    const user = await userRepository.findById(user_id);
    
    if(!user) { 
      throw new Error('User not found');
    }

    request.user = {
      id: user_id
    }

    next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}