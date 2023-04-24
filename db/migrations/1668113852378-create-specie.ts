import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSpecie1668113852378 implements MigrationInterface {
  name: 'CreateSpecie1668113852378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`specie\` (\`id\` int NOT NULL AUTO_INCREMENT, \`average_height\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`designation\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_7ba28414e58e42dde126265c0c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_7ba28414e58e42dde126265c0c\` ON \`specie\``,
    );
    await queryRunner.query(`DROP TABLE \`specie\``);
  }
}
