import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateLogUseCase } from '../createLogUseCase/createLogUseCase';

import { CreateRoomUseCase } from './CreateRoomUseCase';

class CreateRoomController {
  
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    const { id } = req.user;
    const createRoomUseCase = container.resolve(CreateRoomUseCase);
    const room = await createRoomUseCase.execute({ name, description, id });

    const createLogUseCase = container.resolve(CreateLogUseCase);
    await createLogUseCase.execute({ description: 'Create a new Room', room: room, user: room.users });

    return res.json(room);
  }
}

export { CreateRoomController };