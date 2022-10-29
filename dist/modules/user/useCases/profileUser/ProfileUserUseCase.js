"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUserUseCase = void 0;
var _UserMap = require("@modules/user/mapper/UserMap");
var _IUserRepository = require("@modules/user/repositories/IUserRepository");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
let ProfileUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ProfileUserUseCase {
  constructor(userRespository) {
    this.userRespository = userRespository;
  }
  async execute(id) {
    const user = await this.userRespository.findById(id);
    return _UserMap.UserMap.toDTO(user);
  }
}) || _class) || _class) || _class) || _class);
exports.ProfileUserUseCase = ProfileUserUseCase;