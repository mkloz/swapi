import axios from 'axios';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PeopleRepository } from 'src/swapi/people/people.repository';
import { People } from 'src/swapi/people/people.entity';
import { File } from 'src/file/file.entity';
import { Film } from 'src/swapi/film/film.entity';
import { Starship } from 'src/swapi/starship/starship.entity';
import { Vehicle } from 'src/swapi/vehicle/vehicle.entity';
import { Specie } from 'src/swapi/specie/specie.entity';
import { Planet } from 'src/swapi/planet/planet.entity';
import { getEnvVar } from 'src/configs/config';

@Injectable()
export default class People1668117270029 implements MigrationInterface {
  name: 'PeopleSeed1668117270029';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const connection = queryRunner.manager;
    const configSwapi = getEnvVar().swapi;
    const peopleRepo = new PeopleRepository(
      connection.getRepository(People),
      connection.getRepository(Planet),
      connection.getRepository(Specie),
      connection.getRepository(Vehicle),
      connection.getRepository(Starship),
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
          mass: el.mass,
          height: el.height,
          hair_color: el.hair_color,
          skin_color: el.skin_color,
          eye_color: el.eye_color,
          birth_year: el.birth_year,
          gender: el.gender,
          url: configSwapi.projectUrl + '/api/people',
        };
        peopleRepo.create(fields, {
          films: getArrayOfId(el.films),
          homeworld: getArrayOfId([el.homeworld]).at(0),
          species: getArrayOfId(el.species),
          starships: getArrayOfId(el.starships),
          vehicles: getArrayOfId(el.vehicles),
        });
      });
      if (resp.next) {
        await recursiveRunner(resp.next);
      }
    }
    await recursiveRunner(configSwapi.swapiUrl + '/api/people?page=1');
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM people');
  }
}
