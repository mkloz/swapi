import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSwapiRelations1668114864533 implements MigrationInterface {
  name: 'CreateSwapiRelations1668114864533 ';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`planets_films\` (\`planetId\` int NOT NULL, \`filmId\` int NOT NULL, INDEX \`IDX_0669ab21b7cee95d60dff164b9\` (\`planetId\`), INDEX \`IDX_f8e8b057a96edc77554d5e7ed6\` (\`filmId\`), PRIMARY KEY (\`planetId\`, \`filmId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`planets_files\` (\`planetId\` int NOT NULL, \`fileId\` int NOT NULL, INDEX \`IDX_43f4f9d8b36bf0e62b8e9976bc\` (\`planetId\`), INDEX \`IDX_2f66c9d791f6739000bd0035fc\` (\`fileId\`), PRIMARY KEY (\`planetId\`, \`fileId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`species_people\` (\`specieId\` int NOT NULL, \`peopleId\` int NOT NULL, INDEX \`IDX_3a41f889e5a38ddb836fc7ffe2\` (\`specieId\`), INDEX \`IDX_8019a9b0a4e75b66f02bc76a7c\` (\`peopleId\`), PRIMARY KEY (\`specieId\`, \`peopleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`species_films\` (\`specieId\` int NOT NULL, \`filmId\` int NOT NULL, INDEX \`IDX_90486df3539bccc8e95637f6da\` (\`specieId\`), INDEX \`IDX_8822d687beced14aecdfd67076\` (\`filmId\`), PRIMARY KEY (\`specieId\`, \`filmId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`species_files\` (\`specieId\` int NOT NULL, \`fileId\` int NOT NULL, INDEX \`IDX_28eecf8b1866b1217f75ba4791\` (\`specieId\`), INDEX \`IDX_fc83a968d762f178eee88f54f2\` (\`fileId\`), PRIMARY KEY (\`specieId\`, \`fileId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`starships_people\` (\`starshipId\` int NOT NULL, \`peopleId\` int NOT NULL, INDEX \`IDX_1f5fed0fd05c5d164cddb392b3\` (\`starshipId\`), INDEX \`IDX_26d0aa1855752c3b47b6703a69\` (\`peopleId\`), PRIMARY KEY (\`starshipId\`, \`peopleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`starships_films\` (\`starshipId\` int NOT NULL, \`filmId\` int NOT NULL, INDEX \`IDX_69539bdac9f2e1cf41057b7975\` (\`starshipId\`), INDEX \`IDX_c10ff2757d2684ca298114a859\` (\`filmId\`), PRIMARY KEY (\`starshipId\`, \`filmId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`starships_files\` (\`starshipId\` int NOT NULL, \`fileId\` int NOT NULL, INDEX \`IDX_11dcd33b40372586c435b70810\` (\`starshipId\`), INDEX \`IDX_65cae233d3074b5696a0700fd4\` (\`fileId\`), PRIMARY KEY (\`starshipId\`, \`fileId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`vehicles_people\` (\`vehicleId\` int NOT NULL, \`peopleId\` int NOT NULL, INDEX \`IDX_24ef6d872e5b68e6417da9d66a\` (\`vehicleId\`), INDEX \`IDX_dddb9d7b6f97f1c21e8df59fe5\` (\`peopleId\`), PRIMARY KEY (\`vehicleId\`, \`peopleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`vehicles_films\` (\`vehicleId\` int NOT NULL, \`filmId\` int NOT NULL, INDEX \`IDX_0b4253bb8e3fc64c66157b2701\` (\`vehicleId\`), INDEX \`IDX_d5a728d877f70748195c576f0c\` (\`filmId\`), PRIMARY KEY (\`vehicleId\`, \`filmId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`vehicles_files\` (\`vehicleId\` int NOT NULL, \`fileId\` int NOT NULL, INDEX \`IDX_839cd14956eb89077b59b563bf\` (\`vehicleId\`), INDEX \`IDX_53a125bea2df4703a388b1d1e0\` (\`fileId\`), PRIMARY KEY (\`vehicleId\`, \`fileId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`films_people\` (\`filmId\` int NOT NULL, \`peopleId\` int NOT NULL, INDEX \`IDX_1e5f93a920705fb172133d1cfd\` (\`filmId\`), INDEX \`IDX_8d3e51a7748348eec6aa6cdfa7\` (\`peopleId\`), PRIMARY KEY (\`filmId\`, \`peopleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`films_files\` (\`filmId\` int NOT NULL, \`fileId\` int NOT NULL, INDEX \`IDX_81d8d8099c2c127007efc99e09\` (\`filmId\`), INDEX \`IDX_36c856a2089f6f82b9e823eca8\` (\`fileId\`), PRIMARY KEY (\`filmId\`, \`fileId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`people_files\` (\`peopleId\` int NOT NULL, \`fileId\` int NOT NULL, INDEX \`IDX_f4be75434071b61482a9e5149c\` (\`peopleId\`), INDEX \`IDX_b1715fec4a16ddffa3ec1055ad\` (\`fileId\`), PRIMARY KEY (\`peopleId\`, \`fileId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people\` ADD CONSTRAINT \`FK_8f79bb098a482fa585da15ef3a6\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planet\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`planets_films\` ADD CONSTRAINT \`FK_0669ab21b7cee95d60dff164b9d\` FOREIGN KEY (\`planetId\`) REFERENCES \`planet\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`planets_films\` ADD CONSTRAINT \`FK_f8e8b057a96edc77554d5e7ed67\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`planets_files\` ADD CONSTRAINT \`FK_43f4f9d8b36bf0e62b8e9976bcb\` FOREIGN KEY (\`planetId\`) REFERENCES \`planet\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`planets_files\` ADD CONSTRAINT \`FK_2f66c9d791f6739000bd0035fca\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_people\` ADD CONSTRAINT \`FK_3a41f889e5a38ddb836fc7ffe24\` FOREIGN KEY (\`specieId\`) REFERENCES \`specie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_people\` ADD CONSTRAINT \`FK_8019a9b0a4e75b66f02bc76a7c1\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_films\` ADD CONSTRAINT \`FK_90486df3539bccc8e95637f6da0\` FOREIGN KEY (\`specieId\`) REFERENCES \`specie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_films\` ADD CONSTRAINT \`FK_8822d687beced14aecdfd670760\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_files\` ADD CONSTRAINT \`FK_28eecf8b1866b1217f75ba47913\` FOREIGN KEY (\`specieId\`) REFERENCES \`specie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_files\` ADD CONSTRAINT \`FK_fc83a968d762f178eee88f54f2e\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_people\` ADD CONSTRAINT \`FK_1f5fed0fd05c5d164cddb392b34\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starship\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_people\` ADD CONSTRAINT \`FK_26d0aa1855752c3b47b6703a69e\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_films\` ADD CONSTRAINT \`FK_69539bdac9f2e1cf41057b79756\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starship\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_films\` ADD CONSTRAINT \`FK_c10ff2757d2684ca298114a8591\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_files\` ADD CONSTRAINT \`FK_11dcd33b40372586c435b70810d\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starship\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_files\` ADD CONSTRAINT \`FK_65cae233d3074b5696a0700fd4e\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_people\` ADD CONSTRAINT \`FK_24ef6d872e5b68e6417da9d66ad\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_people\` ADD CONSTRAINT \`FK_dddb9d7b6f97f1c21e8df59fe5a\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_films\` ADD CONSTRAINT \`FK_0b4253bb8e3fc64c66157b2701a\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_films\` ADD CONSTRAINT \`FK_d5a728d877f70748195c576f0c9\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_files\` ADD CONSTRAINT \`FK_839cd14956eb89077b59b563bf4\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_files\` ADD CONSTRAINT \`FK_53a125bea2df4703a388b1d1e0d\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_people\` ADD CONSTRAINT \`FK_1e5f93a920705fb172133d1cfd0\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_people\` ADD CONSTRAINT \`FK_8d3e51a7748348eec6aa6cdfa75\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_files\` ADD CONSTRAINT \`FK_81d8d8099c2c127007efc99e09a\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_files\` ADD CONSTRAINT \`FK_36c856a2089f6f82b9e823eca8f\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_files\` ADD CONSTRAINT \`FK_f4be75434071b61482a9e5149c9\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_files\` ADD CONSTRAINT \`FK_b1715fec4a16ddffa3ec1055add\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`people_files\` DROP FOREIGN KEY \`FK_b1715fec4a16ddffa3ec1055add\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_files\` DROP FOREIGN KEY \`FK_f4be75434071b61482a9e5149c9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_files\` DROP FOREIGN KEY \`FK_36c856a2089f6f82b9e823eca8f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_files\` DROP FOREIGN KEY \`FK_81d8d8099c2c127007efc99e09a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_people\` DROP FOREIGN KEY \`FK_8d3e51a7748348eec6aa6cdfa75\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_people\` DROP FOREIGN KEY \`FK_1e5f93a920705fb172133d1cfd0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_files\` DROP FOREIGN KEY \`FK_53a125bea2df4703a388b1d1e0d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_files\` DROP FOREIGN KEY \`FK_839cd14956eb89077b59b563bf4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_films\` DROP FOREIGN KEY \`FK_d5a728d877f70748195c576f0c9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_films\` DROP FOREIGN KEY \`FK_0b4253bb8e3fc64c66157b2701a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_people\` DROP FOREIGN KEY \`FK_dddb9d7b6f97f1c21e8df59fe5a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles_people\` DROP FOREIGN KEY \`FK_24ef6d872e5b68e6417da9d66ad\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_files\` DROP FOREIGN KEY \`FK_65cae233d3074b5696a0700fd4e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_files\` DROP FOREIGN KEY \`FK_11dcd33b40372586c435b70810d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_films\` DROP FOREIGN KEY \`FK_c10ff2757d2684ca298114a8591\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_films\` DROP FOREIGN KEY \`FK_69539bdac9f2e1cf41057b79756\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_people\` DROP FOREIGN KEY \`FK_26d0aa1855752c3b47b6703a69e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`starships_people\` DROP FOREIGN KEY \`FK_1f5fed0fd05c5d164cddb392b34\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_files\` DROP FOREIGN KEY \`FK_fc83a968d762f178eee88f54f2e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_files\` DROP FOREIGN KEY \`FK_28eecf8b1866b1217f75ba47913\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_films\` DROP FOREIGN KEY \`FK_8822d687beced14aecdfd670760\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_films\` DROP FOREIGN KEY \`FK_90486df3539bccc8e95637f6da0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_people\` DROP FOREIGN KEY \`FK_8019a9b0a4e75b66f02bc76a7c1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`species_people\` DROP FOREIGN KEY \`FK_3a41f889e5a38ddb836fc7ffe24\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`planets_files\` DROP FOREIGN KEY \`FK_2f66c9d791f6739000bd0035fca\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`planets_files\` DROP FOREIGN KEY \`FK_43f4f9d8b36bf0e62b8e9976bcb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`planets_films\` DROP FOREIGN KEY \`FK_f8e8b057a96edc77554d5e7ed67\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`planets_films\` DROP FOREIGN KEY \`FK_0669ab21b7cee95d60dff164b9d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_8f79bb098a482fa585da15ef3a6\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b1715fec4a16ddffa3ec1055ad\` ON \`people_files\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f4be75434071b61482a9e5149c\` ON \`people_files\``,
    );
    await queryRunner.query(`DROP TABLE \`people_files\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_36c856a2089f6f82b9e823eca8\` ON \`films_files\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_81d8d8099c2c127007efc99e09\` ON \`films_files\``,
    );
    await queryRunner.query(`DROP TABLE \`films_files\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8d3e51a7748348eec6aa6cdfa7\` ON \`films_people\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1e5f93a920705fb172133d1cfd\` ON \`films_people\``,
    );
    await queryRunner.query(`DROP TABLE \`films_people\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_53a125bea2df4703a388b1d1e0\` ON \`vehicles_files\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_839cd14956eb89077b59b563bf\` ON \`vehicles_files\``,
    );
    await queryRunner.query(`DROP TABLE \`vehicles_files\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_d5a728d877f70748195c576f0c\` ON \`vehicles_films\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0b4253bb8e3fc64c66157b2701\` ON \`vehicles_films\``,
    );
    await queryRunner.query(`DROP TABLE \`vehicles_films\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_dddb9d7b6f97f1c21e8df59fe5\` ON \`vehicles_people\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_24ef6d872e5b68e6417da9d66a\` ON \`vehicles_people\``,
    );
    await queryRunner.query(`DROP TABLE \`vehicles_people\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_65cae233d3074b5696a0700fd4\` ON \`starships_files\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_11dcd33b40372586c435b70810\` ON \`starships_files\``,
    );
    await queryRunner.query(`DROP TABLE \`starships_files\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_c10ff2757d2684ca298114a859\` ON \`starships_films\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_69539bdac9f2e1cf41057b7975\` ON \`starships_films\``,
    );
    await queryRunner.query(`DROP TABLE \`starships_films\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_26d0aa1855752c3b47b6703a69\` ON \`starships_people\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1f5fed0fd05c5d164cddb392b3\` ON \`starships_people\``,
    );
    await queryRunner.query(`DROP TABLE \`starships_people\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fc83a968d762f178eee88f54f2\` ON \`species_files\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_28eecf8b1866b1217f75ba4791\` ON \`species_files\``,
    );
    await queryRunner.query(`DROP TABLE \`species_files\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8822d687beced14aecdfd67076\` ON \`species_films\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_90486df3539bccc8e95637f6da\` ON \`species_films\``,
    );
    await queryRunner.query(`DROP TABLE \`species_films\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8019a9b0a4e75b66f02bc76a7c\` ON \`species_people\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3a41f889e5a38ddb836fc7ffe2\` ON \`species_people\``,
    );
    await queryRunner.query(`DROP TABLE \`species_people\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_2f66c9d791f6739000bd0035fc\` ON \`planets_files\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_43f4f9d8b36bf0e62b8e9976bc\` ON \`planets_files\``,
    );
    await queryRunner.query(`DROP TABLE \`planets_files\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_f8e8b057a96edc77554d5e7ed6\` ON \`planets_films\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0669ab21b7cee95d60dff164b9\` ON \`planets_films\``,
    );
    await queryRunner.query(`DROP TABLE \`planets_films\``);
  }
}
