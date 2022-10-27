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
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from '@shared/providers/MailProvider/implementations/EtherealMailProvider';
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';
import { LocalStoraProvider } from '@shared/providers/StorageProvider/implementations/LocaStorageProvider';
import { S3StorageProvider } from '@shared/providers/StorageProvider/implementations/S3StorageProvider';

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

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
);

const diskStorage = {
  local: LocalStoraProvider,
  s3: S3StorageProvider
}

const disk = process.env.disk === 's3' ? 's3' : 'local';

container.registerSingleton<IStorageProvider>(
  'LocalStorageProvider',
  diskStorage['s3']
)