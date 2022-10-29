"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailUseCase = void 0;
var _IUserRepository = require("@modules/user/repositories/IUserRepository");
var _IUserTokensRepository = require("@modules/user/repositories/IUserTokensRepository");
var _IDateProvider = require("@shared/providers/DateProvider/IDateProvider");
var _IMailProvider = require("@shared/providers/MailProvider/IMailProvider");
var _tsyringe = require("tsyringe");
var _path = require("path");
var _uuid = require("uuid");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;
let SendForgotPasswordMailUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('LuxonDateProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('EtherealMailProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IMailProvider.IMailProvider === "undefined" ? Object : _IMailProvider.IMailProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class SendForgotPasswordMailUseCase {
  constructor(usersRepository, userTokensRepository, dateProvider, mailProvider) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
    this.mailProvider = mailProvider;
  }
  async execute(email) {
    const user = await this.usersRepository.findByEmail(email);
    const templatePath = (0, _path.resolve)(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');
    if (!user) {
      throw new Error('User does not exists!');
    }
    const token = (0, _uuid.v4)();
    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date: this.dateProvider.addHours(3)
    });
    const variables = {
      name: user.name,
      link: `http://localhost:3333/password/reset?token=${token}`
    };
    await this.mailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath);
  }
}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.SendForgotPasswordMailUseCase = SendForgotPasswordMailUseCase;