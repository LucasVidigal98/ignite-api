import { UserRepository } from '@modules/user/repositories/repositoryInMemory/UserRepositoryInMemory';
import { NextFunction, Request, Response } from 'express';

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);

  if(!user?.is_admin) {
    throw new Error('User isnt admin!');
  }

  return next();
}