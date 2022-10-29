"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRooms1632787966472 = void 0;
var _typeorm = require("typeorm");
class CreateRooms1632787966472 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'rooms',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'users_admin',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'users',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey("rooms", new _typeorm.TableForeignKey({
      columnNames: ["users_admin"],
      referencedColumnNames: ["id"],
      referencedTableName: "users_tmg",
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
    await queryRunner.createForeignKey("rooms", new _typeorm.TableForeignKey({
      columnNames: ["users"],
      referencedColumnNames: ["id"],
      referencedTableName: "users_tmg",
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('rooms');
  }
}
exports.CreateRooms1632787966472 = CreateRooms1632787966472;