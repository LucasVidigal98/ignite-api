"use strict";

var _ = _interopRequireDefault(require("../"));
var _uuid = require("uuid");
var _bcrypt = require("bcrypt");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
async function create() {
  const connection = await (0, _.default)();
  const id = (0, _uuid.v4)();
  const password = await (0, _bcrypt.hash)('admin', 8);
  await connection.query(`
    INSERT INTO users_tmg (id, name, email, password, created_at, is_admin)
    values('${id}', 'admin', 'admin@ignite.com', '${password}', 'now()', true)
  `);
  await connection.close();
}
create().then(() => console.log('User Admin is created'));