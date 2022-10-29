"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
require("reflect-metadata");
var _user = require("@shared/infra/http/routes/user.routes");
var _authenticate = require("@shared/infra/http/routes/authenticate.routes");
var _room = require("@shared/infra/http/routes/room.routes");
var _typeorm = _interopRequireDefault(require("./typeorm"));
require("./container");
var _password = require("./infra/http/routes/password.routes");
var _dotenv = require("dotenv");
var _upload = _interopRequireDefault(require("@config/upload"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
(0, _dotenv.config)();
(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use('/avatar', _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use(_express.default.json());
app.use('/user', _user.userRoutes);
app.use('/password', _password.passwordRoutes);
app.use(_authenticate.authenticateRoutes);
app.use('/room', _room.roomRoutes);