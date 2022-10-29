"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUseCase = void 0;
var _IUserRepository = require("@modules/user/repositories/IUserRepository");
var _IUserTokensRepository = require("@modules/user/repositories/IUserTokensRepository");
var _IDateProvider = require("@shared/providers/DateProvider/IDateProvider");
var _bcrypt = require("bcrypt");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
let ResetPasswordUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('LuxonDateProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUseCase {
  constructor(userTokensRepository, dateProvider, usersRepository) {
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
    this.usersRepository = usersRepository;
  }
  async execute({
    token,
    password
  }) {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new Error('Token Invalid');
    }
    console.log(this.dateProvider.getTodayDate());
    if (!this.dateProvider.comapareIfBefore(this.dateProvider.getTodayDate(), userToken.expires_date)) {
      throw new Error('Token expired');
    }
    const user = await this.usersRepository.findById(userToken.user_id);
    const newPassord = await (0, _bcrypt.hash)(password, 8);
    await this.usersRepository.update({
      ...user,
      password: newPassord
    });
    await this.userTokensRepository.deleteById(userToken.id);
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUseCase = ResetPasswordUseCase;