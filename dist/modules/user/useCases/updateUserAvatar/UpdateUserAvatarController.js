"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;
var _tsyringe = require("tsyringe");
var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");
class UpdateUserAvatarController {
  async handle(request, response) {
    var _request$file;
    const {
      id
    } = request.user;
    const avatar_file = (_request$file = request.file) === null || _request$file === void 0 ? void 0 : _request$file.filename;
    const updateUserAvatarUseCase = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);
    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file
    });
    return response.status(204).send();
  }
}
exports.UpdateUserAvatarController = UpdateUserAvatarController;