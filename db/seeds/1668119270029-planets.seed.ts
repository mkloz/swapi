import axios from 'axios';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PlanetRepository } from 'src/swapi/planet/planet.repository';
import { File } from 'src/file/file.entity';
import { Film } from 'src/swapi/film/film.entity';
import { People } from 'src/swapi/people/people.entity';
import { Planet } from 'src/swapi/planet/planet.entity';
import { getEnvVar } from 'src/configs/config';

@Injectable()
export default class Planets1668119270029 implements MigrationInterface {
  name: 'PlanetSeed1668119270029';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const connection = queryRunner.manager;
    const configSwapi = getEnvVar().swapi;
    const planetRepo = new PlanetRepository(
      connection.getRepository(Planet),
      connection.getRepository(People),
      connection.getRepository(Film),
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
          rotation_period: el.rotation_period,
          orbital_period: el.orbital_period,
          diameter: el.diameter,
          climate: el.climate,
          gravity: el.gravity,
          terrain: el.terrain,
          surface_water: el.surface_water,
          population: el.population,
          url: configSwapi.projectUrl + '/api/planets',
        };
        planetRepo.create(fields, {
          films: getArrayOfId(el.films),
          residents: getArrayOfId(el.residents),
        });
      });
      if (resp.next) {
        await recursiveRunner(resp.next);
      }
    }
    await recursiveRunner(configSwapi.swapiUrl + '/api/planets?page=1');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM planet');
  }
}
