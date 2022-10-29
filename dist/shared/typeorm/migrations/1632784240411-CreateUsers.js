"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1632784240411 = void 0;
var _typeorm = require("typeorm");
class CreateUsers1632784240411 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users_tmg',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }
}
exports.CreateUsers1632784240411 = CreateUsers1632784240411;