"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;
var _typeorm = require("typeorm");
var _User = require("../entities/User");
class UserRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }
  async findById(id) {
    return await this.repository.findOne(id);
  }
  async findByEmail(email) {
    return await this.repository.findOne({
      where: {
        email
      }
    });
  }
  async list() {
    return await this.repository.find();
  }
  async create({
    name,
    email,
    password,
    id,
    avatar
  }) {
    const user = this.repository.create({
      name,
      email,
      password,
      avatar,
      id
    });
    await this.repository.save(user);
    return user;
  }
  async update(user) {
    await this.repository.update({
      id: user.id
    }, user);
  }
}
exports.UserRepository = UserRepository;