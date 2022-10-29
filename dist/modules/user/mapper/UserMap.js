"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;
class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar
  }) {
    let avatar_url = '';
    switch (process.env.disk) {
      case 'local':
        avatar_url = `${process.env.APP_API_URL}/avatar/${avatar}`;
        break;
      case 's3':
        avatar_url = `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`;
        break;
      default:
        avatar_url = '';
        break;
    }
    return {
      id,
      name,
      email,
      avatar,
      avatar_url
    };
  }
}
exports.UserMap = UserMap;