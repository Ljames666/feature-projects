import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProjects1641937504821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "projects",
        columns: [
          { name: "id", type: "uuid", isNullable: false, isPrimary: true },

          { name: "nome", type: "varchar", length: "25", isNullable: false },

          { name: "description", type: "varchar", isNullable: false },

          { name: "url", type: "varchar", length: "40", isNullable: true },

          { name: "startDate", type: "timestamp" },

          { name: "endDate", type: "timestamp" },

          { name: "user_id", type: "uuid", isNullable: false },

          { name: "created_at", type: "timestamp", default: "now()" },

          { name: "updated_at", type: "timestamp", default: "now()" },
        ],

        foreignKeys: [
          {
            name: "project_user_fk",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("projects");
  }
}
