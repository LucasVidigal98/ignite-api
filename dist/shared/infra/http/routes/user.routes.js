"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _CreateUserController = require("@modules/user/useCases/createUser/CreateUserController");
var _ListUsersController = require("@modules/user/useCases/listUsers/ListUsersController");
var _UpdateUserAvatarController = require("@modules/user/useCases/updateUserAvatar/UpdateUserAvatarController");
var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");
var _upload = _interopRequireDefault(require("@config/upload"));
var _ProfileUserController = require("@modules/user/useCases/profileUser/ProfileUserController");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const userRoutes = (0, _express.Router)();
exports.userRoutes = userRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _CreateUserController.CreateUserController();
const listUsersController = new _ListUsersController.ListUserController();
const updateUserAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
userRoutes.post('/', createUserController.handle);
userRoutes.use(_ensureAuthenticated.ensureAuthenticated);
userRoutes.get('/', listUsersController.handle);
userRoutes.get('/profile', profileUserController.handle);
userRoutes.patch('/avatar', uploadAvatar.single('avatar'), updateUserAvatarController.handle);