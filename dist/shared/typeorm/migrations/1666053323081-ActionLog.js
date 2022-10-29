"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionLog1666053323081 = void 0;
var _typeorm = require("typeorm");
class ActionLog1666053323081 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'action_log',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'userid',
        type: 'uuid',
        isNullable: false
      }, {
        name: 'roomid',
        type: 'uuid',
        isNullable: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey("action_log", new _typeorm.TableForeignKey({
      columnNames: ["userid"],
      referencedColumnNames: ["id"],
      referencedTableName: "users_tmg",
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
    await queryRunner.createForeignKey("action_log", new _typeorm.TableForeignKey({
      columnNames: ["roomid"],
      referencedColumnNames: ["id"],
      referencedTableName: "rooms",
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  }
  async down(queryRunner) {}
}
exports.ActionLog1666053323081 = ActionLog1666053323081;