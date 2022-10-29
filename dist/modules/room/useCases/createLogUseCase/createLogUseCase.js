"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLogUseCase = void 0;
var _ILogRepository = require("@modules/room/repositories/ILogRepository");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
let CreateLogUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("LogRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ILogRepository.ILogRepository === "undefined" ? Object : _ILogRepository.ILogRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateLogUseCase {
  constructor(logRepository) {
    this.logRepository = logRepository;
  }
  async execute({
    description,
    user,
    room
  }) {
    await this.logRepository.createLog({
      description,
      room,
      user
    });
  }
}) || _class) || _class) || _class) || _class);
exports.CreateLogUseCase = CreateLogUseCase;