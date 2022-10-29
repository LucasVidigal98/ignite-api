"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserAdmin1666135154800 = void 0;
var _typeorm = require("typeorm");
class AlterUserAdmin1666135154800 {
  async up(queryRunner) {
    await queryRunner.addColumn("users_tmg", new _typeorm.TableColumn({
      name: 'is_admin',
      type: 'boolean',
      isNullable: true
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropColumn("users_tmg", "is_admin");
  }
}
exports.AlterUserAdmin1666135154800 = AlterUserAdmin1666135154800;