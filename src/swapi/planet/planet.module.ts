import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './planet.entity';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';
import { PlanetRepository } from './planet.repository';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';
import { File } from 'src/file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planet, Film, People, File])],
  providers: [PlanetService, PlanetRepository],
  controllers: [PlanetController],
  exports: [PlanetRepository],
})
export class PlanetModule {}
