import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './people.entity';
import { PeopleRepository } from './people.repository';

import { Planet } from '../planet/planet.entity';
import { Specie } from '../specie/specie.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { Starship } from '../starship/starship.entity';
import { Film } from '../film/film.entity';
import { File } from 'src/file/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People,
      Planet,
      Specie,
      Vehicle,
      Starship,
      Film,
      File,
    ]),
  ],
  providers: [PeopleService, PeopleRepository],
  controllers: [PeopleController],
})
export class PeopleModule {}
