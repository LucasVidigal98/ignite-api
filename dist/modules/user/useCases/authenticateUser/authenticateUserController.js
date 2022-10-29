"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserController = void 0;
var _tsyringe = require("tsyringe");
var _authenticateUserCase = require("./authenticateUserCase");
class AuthenticateUserController {
  async handle(request, response) {
    const {
      email,
      password
    } = request.body;
    const authenticateUserUseCase = _tsyringe.container.resolve(_authenticateUserCase.AuthenticateUserUseCase);
    const {
      user,
      token,
      refresh_token
    } = await authenticateUserUseCase.execute({
      email,
      password
    });
    return response.json({
      user,
      token,
      refresh_token
    });
  }
}
exports.AuthenticateUserController = AuthenticateUserController;