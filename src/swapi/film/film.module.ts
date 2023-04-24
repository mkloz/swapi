import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './film.entity';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { FilmRepository } from './film.repository';
import { Planet } from '../planet/planet.entity';
import { Specie } from '../specie/specie.entity';
import { Starship } from '../starship/starship.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { People } from '../people/people.entity';
import { File } from '../../file/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Film,
      People,
      Planet,
      Specie,
      Starship,
      Vehicle,
      File,
    ]),
  ],
  controllers: [FilmController],
  providers: [FilmService, FilmRepository],
})
export class FilmModule {}
