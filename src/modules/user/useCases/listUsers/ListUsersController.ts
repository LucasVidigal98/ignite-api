import { Request, Response } from 'express';
import { ListUserUseCase } from './ListUserUseCase';

class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}

  handle(req: Request, res: Response): Response {
    const users = this.listUserUseCase.execute();

    return res.json(users);
  }
}

export { ListUserController };