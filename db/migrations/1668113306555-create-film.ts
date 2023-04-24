import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilm1668113306555 implements MigrationInterface {
  name: 'CreateFilm1668113306555';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`film\` (\`id\` int NOT NULL AUTO_INCREMENT, \`director\` varchar(255) NOT NULL, \`episode_id\` int NOT NULL, \`opening_crawl\` text NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` date NOT NULL, \`title\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_91baa4f1f62ea493de2afdd3d6\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_91baa4f1f62ea493de2afdd3d6\` ON \`film\``,
    );
    await queryRunner.query(`DROP TABLE \`film\``);
  }
}
