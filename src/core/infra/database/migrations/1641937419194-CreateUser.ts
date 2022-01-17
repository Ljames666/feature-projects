import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1641937419194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",

        columns: [
          { name: "id", type: "uuid", isNullable: false, isPrimary: true },

          { name: "nome", type: "varchar", length: "30", isNullable: false },

          { name: "cpf", type: "varchar", length: "11", isNullable: false },

          { name: "nome", type: "numeric", isNullable: true },

          { name: "created_at", type: "timestamp", default: "now()" },

          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
