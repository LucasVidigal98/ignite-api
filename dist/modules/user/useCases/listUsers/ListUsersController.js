"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUserController = void 0;
var _tsyringe = require("tsyringe");
var _ListUserUseCase = require("./ListUserUseCase");
class ListUserController {
  async handle(req, res) {
    const listUserUseCase = _tsyringe.container.resolve(_ListUserUseCase.ListUserUseCase);
    const users = await listUserUseCase.execute();
    return res.json(users);
  }
}
exports.ListUserController = ListUserController;