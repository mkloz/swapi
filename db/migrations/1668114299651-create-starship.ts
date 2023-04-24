import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStarship1668114299651 implements MigrationInterface {
  name: 'CreateStarship1668114299651';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`starship\` (\`id\` int NOT NULL AUTO_INCREMENT, \`MGLT\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`hyperdrive_rating\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_c2d61780efcb47029ac7792a2c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_c2d61780efcb47029ac7792a2c\` ON \`starship\``,
    );
    await queryRunner.query(`DROP TABLE \`starship\``);
  }
}
