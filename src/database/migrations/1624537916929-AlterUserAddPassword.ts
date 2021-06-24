import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddPassword1624537916929 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Criando a senha atraves de um migration
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name : "password",
                type: "varchar",
                isNullable : true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //removar a migration
        await queryRunner.dropColumn("users","password");
    }

}
