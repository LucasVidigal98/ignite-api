"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _bcrypt = require("bcrypt");
var _jsonwebtoken = require("jsonwebtoken");
var _IUserRepository = require("@modules/user/repositories/IUserRepository");
var _UserTokensRepository = require("@modules/user/infra/typeorm/repositories/UserTokensRepository");
var _auth = _interopRequireDefault(require("@config/auth"));
var _LuxonDateProvider = require("@shared/providers/DateProvider/implementations/LuxonDateProvider");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UserTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("LuxonDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _UserTokensRepository.UserTokensRepository === "undefined" ? Object : _UserTokensRepository.UserTokensRepository, typeof _LuxonDateProvider.LuxonDateProvider === "undefined" ? Object : _LuxonDateProvider.LuxonDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(userRepository, userTokensRepository, luxonDateProvider) {
    this.userRepository = userRepository;
    this.userTokensRepository = userTokensRepository;
    this.luxonDateProvider = luxonDateProvider;
  }
  async execute({
    email,
    password
  }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email or password incorrect");
    }
    const passwordMatched = await (0, _bcrypt.compare)(password, user.password);
    if (!passwordMatched) {
      throw new Error("Email or password incorrect");
    }
    const token = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      subject: user.id,
      expiresIn: _auth.default.expires_in_token
    });
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      subject: user.id,
      expiresIn: _auth.default.expires_in_refresh_token
    });
    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: this.luxonDateProvider.getNext30Day()
    });
    return {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    };
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;