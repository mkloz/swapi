import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthRelations1668115270029 implements MigrationInterface {
  name: 'CreateAuthRelations1668115270029';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users_roles\` (\`userId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` (\`userId\`), INDEX \`IDX_4fb14631257670efa14b15a3d8\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_776b7cf9330802e5ef5a8fb18dc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_4fb14631257670efa14b15a3d86\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_4fb14631257670efa14b15a3d86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_776b7cf9330802e5ef5a8fb18dc\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4fb14631257670efa14b15a3d8\` ON \`users_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` ON \`users_roles\``,
    );
    await queryRunner.query(`DROP TABLE \`users_roles\``);
  }
}
