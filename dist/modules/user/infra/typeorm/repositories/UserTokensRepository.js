"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTokensRepository = void 0;
var _typeorm = require("typeorm");
var _UserTokens = require("../entities/UserTokens");
class UserTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_UserTokens.UserTokens);
  }
  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    });
    await this.repository.save(userToken);
    return userToken;
  }
  async findByUserIdAndToken(user_id, refresh_token) {
    return this.repository.findOne({
      user_id,
      refresh_token
    });
  }
  async deleteById(id) {
    await this.repository.delete(id);
  }
  async findByToken(token) {
    return this.repository.findOne({
      refresh_token: token
    });
  }
}
exports.UserTokensRepository = UserTokensRepository;