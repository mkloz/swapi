import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './starship.entity';
import { StarshipRepository } from './starship.repository';
import { StarshipService } from './starship.service';
import { StarshipController } from './starship.controller';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';
import { File } from 'src/file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Starship, Film, People, File])],
  providers: [StarshipService, StarshipRepository],
  controllers: [StarshipController],
  exports: [StarshipRepository],
})
export class StarshipModule {}
