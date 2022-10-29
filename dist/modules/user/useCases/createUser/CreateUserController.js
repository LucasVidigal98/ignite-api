"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;
var _tsyringe = require("tsyringe");
var _CreateUserUseCase = require("./CreateUserUseCase");
class CreateUserController {
  async handle(req, res) {
    const {
      name,
      email,
      password
    } = req.body;
    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);
    const user = await createUserUseCase.execute({
      name,
      email,
      password
    });
    return res.status(201).json(user);
  }
}
exports.CreateUserController = CreateUserController;