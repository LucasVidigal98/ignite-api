import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUseAvatar1632004103597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users_tmg", 
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users_tmg", "avatar");
    }
}
