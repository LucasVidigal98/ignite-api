"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoomRepository = void 0;
var _Room = require("../../infra/typeorm/entities/Room");
class RoomRepository {
  constructor() {
    this.rooms = [];
  }
  async create({
    name,
    description,
    userAdmin
  }) {
    const room = new _Room.Room();
    Object.assign(room, {
      name,
      description,
      usersAdmin: [userAdmin.id],
      users: [userAdmin.id]
    });
    this.rooms.push(room);
    return room;
  }
}
exports.RoomRepository = RoomRepository;