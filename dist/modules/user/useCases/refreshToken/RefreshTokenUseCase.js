"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;
var _auth = _interopRequireDefault(require("@config/auth"));
var _UserTokensRepository = require("@modules/user/infra/typeorm/repositories/UserTokensRepository");
var _LuxonDateProvider = require("@shared/providers/DateProvider/implementations/LuxonDateProvider");
var _jsonwebtoken = require("jsonwebtoken");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("LuxonDateProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UserTokensRepository.UserTokensRepository === "undefined" ? Object : _UserTokensRepository.UserTokensRepository, typeof _LuxonDateProvider.LuxonDateProvider === "undefined" ? Object : _LuxonDateProvider.LuxonDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(userTokensRepository, luxonDateProvider) {
    this.userTokensRepository = userTokensRepository;
    this.luxonDateProvider = luxonDateProvider;
  }
  async execute(token) {
    const {
      email,
      sub
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_refresh_token);
    const userId = sub;
    const userToken = await this.userTokensRepository.findByUserIdAndToken(userId, token);
    if (!userToken) {
      throw new Error('Refresh token not found!');
    }
    await this.userTokensRepository.deleteById(userToken.id);
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      subject: userId,
      expiresIn: _auth.default.expires_in_refresh_token
    });
    await this.userTokensRepository.create({
      expires_date: this.luxonDateProvider.getNext30Day(),
      user_id: userId,
      refresh_token
    });
    const new_token = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      subject: userId,
      expiresIn: _auth.default.expires_in_token
    });
    return {
      token: new_token,
      refresh_token
    };
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;