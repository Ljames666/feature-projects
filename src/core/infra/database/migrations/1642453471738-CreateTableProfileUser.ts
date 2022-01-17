import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableProfileUser1642453471738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "profiles",
        columns: [
          { name: "id", type: "uuid", isNullable: false, isPrimary: true },

          { name: "username", type: "varchar", length: "25", isNullable: false },

          { name: "password", type: "varchar", isNullable: false },

          { name: "avatarUrl", type: "varchar", length: "40", isNullable: true },

          { name: "phoneNumber", type: "numeric" },

          { name: "user_id", type: "uuid", isNullable: false },
        ],

        foreignKeys: [
          {
            name: "profile_user_fk",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("profile");
  }
}
