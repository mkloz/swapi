import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeople1668113533342 implements MigrationInterface {
  name: 'CreatePeople1668113533342';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`people\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, \`homeworldId\` int NULL, UNIQUE INDEX \`IDX_e7ec00b080e693706a6eaa6d31\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e7ec00b080e693706a6eaa6d31\` ON \`people\``,
    );
    await queryRunner.query(`DROP TABLE \`people\``);
  }
}
