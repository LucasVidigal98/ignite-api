"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _UserRepository = require("@modules/user/infra/typeorm/repositories/UserRepository");
var _dec, _dec2, _dec3, _dec4, _class;
let ListUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _UserRepository.UserRepository === "undefined" ? Object : _UserRepository.UserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute() {
    const users = await this.userRepository.list();
    return users;
  }
}) || _class) || _class) || _class) || _class);
exports.ListUserUseCase = ListUserUseCase;