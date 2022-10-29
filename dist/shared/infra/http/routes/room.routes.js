"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roomRoutes = void 0;
var _express = require("express");
var _CreateRoomController = require("@modules/room/useCases/createRoomUseCase/CreateRoomController");
var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");
const roomRoutes = (0, _express.Router)();
exports.roomRoutes = roomRoutes;
const createRoomController = new _CreateRoomController.CreateRoomController();
roomRoutes.use(_ensureAuthenticated.ensureAuthenticated);
roomRoutes.post('/', createRoomController.handle);