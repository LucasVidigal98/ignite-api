"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogRepository = void 0;
var _typeorm = require("typeorm");
var _Log = require("../entities/Log");
class LogRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Log.Log);
  }
  async createLog({
    description,
    room,
    user
  }) {
    const log = this.repository.create({
      description,
      room,
      user
    });
    await this.repository.save(log);
  }
}
exports.LogRepository = LogRepository;