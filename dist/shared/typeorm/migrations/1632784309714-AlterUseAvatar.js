"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUseAvatar1632784309714 = void 0;
var _typeorm = require("typeorm");
class AlterUseAvatar1632784309714 {
  async up(queryRunner) {
    await queryRunner.addColumn("users_tmg", new _typeorm.TableColumn({
      name: 'avatar',
      type: 'varchar',
      isNullable: true
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropColumn("users_tmg", "avatar");
  }
}
exports.AlterUseAvatar1632784309714 = AlterUseAvatar1632784309714;