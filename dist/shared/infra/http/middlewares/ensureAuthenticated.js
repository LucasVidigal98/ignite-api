"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;
var _express = require("express");
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("@config/auth"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
async function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('JWT token is missing');
  }
  const [, token] = authHeader.split(' ');
  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);
    _express.request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}