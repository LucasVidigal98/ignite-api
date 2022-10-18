import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAdmin1666135154800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users_tmg", 
            new TableColumn({
                name: 'is_admin',
                type: 'boolean',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users_tmg", "is_admin");
    }

}
