import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ActionLog1666053323081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'action_log',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'userid',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'roomid',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                }
            ]
        }));

        await queryRunner.createForeignKey("action_log", new TableForeignKey({
            columnNames: ["userid"],
            referencedColumnNames: ["id"],
            referencedTableName: "users_tmg",
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
        }));

        await queryRunner.createForeignKey("action_log", new TableForeignKey({
            columnNames: ["roomid"],
            referencedColumnNames: ["id"],
            referencedTableName: "rooms",
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
