import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/user/repositories/IUserRepository';
import { UserRepository } from '../../modules/user/infra/typeorm/repositories/UserRepository';
import { IRoomRepository } from '../../modules/room/repositories/IRoomRepository';
import { RoomRepository } from '../../modules/room/infra/typeorm/repositories/RoomRepository';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<IRoomRepository>(
  'RoomRepository',
  RoomRepository
)