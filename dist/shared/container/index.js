"use strict";

var _tsyringe = require("tsyringe");
var _UserRepository = require("@modules/user/infra/typeorm/repositories/UserRepository");
var _RoomRepository = require("@modules/room/infra/typeorm/repositories/RoomRepository");
var _LogRepository = require("@modules/room/infra/typeorm/repositories/LogRepository");
var _UserTokensRepository = require("@modules/user/infra/typeorm/repositories/UserTokensRepository");
var _LuxonDateProvider = require("@shared/providers/DateProvider/implementations/LuxonDateProvider");
var _EtherealMailProvider = require("@shared/providers/MailProvider/implementations/EtherealMailProvider");
var _LocaStorageProvider = require("@shared/providers/StorageProvider/implementations/LocaStorageProvider");
var _S3StorageProvider = require("@shared/providers/StorageProvider/implementations/S3StorageProvider");
_tsyringe.container.registerSingleton('UserRepository', _UserRepository.UserRepository);
_tsyringe.container.registerSingleton('RoomRepository', _RoomRepository.RoomRepository);
_tsyringe.container.registerSingleton('LogRepository', _LogRepository.LogRepository);
_tsyringe.container.registerSingleton('LuxonDateProvider', _LuxonDateProvider.LuxonDateProvider);
_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.UserTokensRepository);
_tsyringe.container.registerInstance('EtherealMailProvider', new _EtherealMailProvider.EtherealMailProvider());
const diskStorage = {
  local: _LocaStorageProvider.LocalStoraProvider,
  s3: _S3StorageProvider.S3StorageProvider
};
const disk = process.env.disk === 's3' ? 's3' : 'local';
_tsyringe.container.registerSingleton('LocalStorageProvider', diskStorage['s3']);