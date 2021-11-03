import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateRooms1632787966472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'rooms',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'users_admin',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'users',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                }
            ],
        }));

        await queryRunner.createForeignKey("rooms", new TableForeignKey({
            columnNames: ["users_admin"],
            referencedColumnNames: ["id"],
            referencedTableName: "users_tmg",
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
        }));

        await queryRunner.createForeignKey("rooms", new TableForeignKey({
            columnNames: ["users"],
            referencedColumnNames: ["id"],
            referencedTableName: "users_tmg",
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rooms');
    }


}
