"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;
var _UserRepositoryInMemory = require("@modules/user/repositories/repositoryInMemory/UserRepositoryInMemory");
async function ensureAdmin(req, res, next) {
  const {
    id
  } = req.user;
  const userRepository = new _UserRepositoryInMemory.UserRepository();
  const user = await userRepository.findById(id);
  if (!(user !== null && user !== void 0 && user.is_admin)) {
    throw new Error('User isnt admin!');
  }
  return next();
}