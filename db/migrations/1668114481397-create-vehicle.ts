import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVehicle1668114481397 implements MigrationInterface {
  name: 'CreateVehicle1668114481397';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`consumables\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`crew\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_9d8f33468a4dbf65d2b37370c9\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_9d8f33468a4dbf65d2b37370c9\` ON \`vehicle\``,
    );
    await queryRunner.query(`DROP TABLE \`vehicle\``);
  }
}
