"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRoomController = void 0;
var _tsyringe = require("tsyringe");
var _createLogUseCase = require("../createLogUseCase/createLogUseCase");
var _CreateRoomUseCase = require("./CreateRoomUseCase");
class CreateRoomController {
  async handle(req, res) {
    const {
      name,
      description
    } = req.body;
    const {
      id
    } = req.user;
    const createRoomUseCase = _tsyringe.container.resolve(_CreateRoomUseCase.CreateRoomUseCase);
    const room = await createRoomUseCase.execute({
      name,
      description,
      id
    });
    const createLogUseCase = _tsyringe.container.resolve(_createLogUseCase.CreateLogUseCase);
    await createLogUseCase.execute({
      description: 'Create a new Room',
      room: room,
      user: room.users
    });
    return res.json(room);
  }
}
exports.CreateRoomController = CreateRoomController;