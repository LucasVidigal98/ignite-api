"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateRoutes = void 0;
var _express = require("express");
var _authenticateUserController = require("@modules/user/useCases/authenticateUser/authenticateUserController");
var _RefreshTokenController = require("@modules/user/useCases/refreshToken/RefreshTokenController");
const authenticateRoutes = (0, _express.Router)();
exports.authenticateRoutes = authenticateRoutes;
const authenticateUserController = new _authenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);