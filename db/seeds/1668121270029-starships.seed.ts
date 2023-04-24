import axios from 'axios';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StarshipRepository } from 'src/swapi/starship/starship.repository';
import { Starship } from 'src/swapi/starship/starship.entity';
import { Film } from 'src/swapi/film/film.entity';
import { People } from 'src/swapi/people/people.entity';
import { File } from 'src/file/file.entity';
import { getEnvVar } from 'src/configs/config';

@Injectable()
export default class Starships1668121270029 implements MigrationInterface {
  name: 'StarshipSeed1668121270029';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const connection = queryRunner.manager;
    const configSwapi = getEnvVar().swapi;
    const starshipRepo = new StarshipRepository(
      connection.getRepository(Starship),
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
          MGLT: el.MGLT,
          cargo_capacity: el.cargo_capacity,
          consumables: el.consumables,
          cost_in_credits: el.cost_in_credits,
          crew: el.crew,
          hyperdrive_rating: el.hyperdrive_rating,
          length: el.length,
          manufacturer: el.manufacturer,
          max_atmosphering_speed: el.max_atmosphering_speed,
          model: el.model,
          passengers: el.passengers,
          starship_class: el.starship_class,
          url: configSwapi.projectUrl + '/api/starships',
        };
        starshipRepo.create(fields, {
          films: getArrayOfId(el.films),
          pilots: getArrayOfId(el.pilots),
        });
      });
      if (resp.next) {
        await recursiveRunner(resp.next);
      }
    }
    await recursiveRunner(configSwapi.swapiUrl + '/api/starships?page=1');
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM starship');
  }
}
