"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRoomUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IUserRepository = require("@modules/user/repositories/IUserRepository");
var _IRoomRepository = require("@modules/room/repositories/IRoomRepository");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let CreateRoomUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RoomRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IRoomRepository.IRoomRepository === "undefined" ? Object : _IRoomRepository.IRoomRepository, typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateRoomUseCase {
  constructor(roomRepository, userRepository) {
    this.roomRepository = roomRepository;
    this.userRepository = userRepository;
  }
  async execute({
    name,
    description,
    id
  }) {
    const userAdmin = await this.userRepository.findById(id);
    if (!userAdmin) {
      throw new Error(`User with id ${id} is not found`);
    }
    const room = await this.roomRepository.create({
      name,
      description,
      userAdmin,
      users: userAdmin
    });
    return room;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.CreateRoomUseCase = CreateRoomUseCase;