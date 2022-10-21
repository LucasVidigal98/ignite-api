import { container } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { IRoomRepository } from '@modules/room/repositories/IRoomRepository';
import { RoomRepository } from '@modules/room/infra/typeorm/repositories/RoomRepository';
import { ILogRepository } from '@modules/room/repositories/ILogRepository';
import { LogRepository } from '@modules/room/infra/typeorm/repositories/LogRepository';
import { IUserTokensRepository } from '@modules/user/repositories/IUserTokensRepository';
import { UserTokensRepository } from '@modules/user/infra/typeorm/repositories/UserTokensRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { LuxonDateProvider } from '@shared/providers/DateProvider/implementations/LuxonDateProvider';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<IRoomRepository>(
  'RoomRepository',
  RoomRepository
)

container.registerSingleton<ILogRepository>(
  'LogRepository',
  LogRepository
)

container.registerSingleton<IDateProvider>(
  'LuxonDateProvider',
  LuxonDateProvider
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)