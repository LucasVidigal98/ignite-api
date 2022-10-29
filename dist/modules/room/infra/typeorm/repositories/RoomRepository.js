"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoomRepository = void 0;
var _typeorm = require("typeorm");
var _Room = require("../entities/Room");
class RoomRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Room.Room);
  }
  async create({
    name,
    description,
    userAdmin,
    users
  }) {
    const room = this.repository.create({
      users: users,
      name,
      description,
      usersAdmin: userAdmin
    });
    await this.repository.save(room);
    return room;
  }
}
exports.RoomRepository = RoomRepository;