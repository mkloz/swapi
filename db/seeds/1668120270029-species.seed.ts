import axios from 'axios';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SpecieRepository } from 'src/swapi/specie/specie.repository';
import { Specie } from 'src/swapi/specie/specie.entity';
import { Film } from 'src/swapi/film/film.entity';
import { People } from 'src/swapi/people/people.entity';
import { File } from 'src/file/file.entity';
import { getEnvVar } from 'src/configs/config';

@Injectable()
export default class Species1668120270029 implements MigrationInterface {
  name: 'SpecieSeed1668120270029';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const connection = queryRunner.manager;
    const configSwapi = getEnvVar().swapi;
    const specieRepo = new SpecieRepository(
      connection.getRepository(Specie),
      connection.getRepository(Film),
      connection.getRepository(People),
      connection.getRepository(File),
    );
    function getArrayOfId(array: Array<string>) {
      return array.map((el) => +el.split('/').at(-2));
    }
    async function recursiveRunner(url: string): Promise<void> {
      const resp = await axios.get(url).then((response) => response.data);
      resp.results.forEach((el) => {
        const fields = {
          id: getArrayOfId([el.url]).at(0),
          name: el.name,
          average_height: el.average_height,
          average_lifespan: el.average_lifespan,
          classification: el.classification,
          designation: el.designation,
          eye_colors: el.eye_colors,
          hair_colors: el.hair_colors,
          language: el.language,
          skin_colors: el.skin_colors,
          url: configSwapi.projectUrl + '/api/species',
        };
        specieRepo.create(fields, {
          films: getArrayOfId(el.films),
          people: getArrayOfId(el.people),
        });
      });
      if (resp.next) {
        await recursiveRunner(resp.next);
      }
    }
    await recursiveRunner(configSwapi.swapiUrl + '/api/species?page=1');
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM specie');
  }
}
