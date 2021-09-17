import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, email, password } = req.body;
    const user = this.createUserUseCase.execute({name, email, password});
    
    return res.json(user);
  }
}

export { CreateUserController };