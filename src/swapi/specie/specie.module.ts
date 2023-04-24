import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './specie.entity';
import { SpecieController } from './specie.controller';
import { SpecieRepository } from './specie.repository';
import { SpecieService } from './specie.service';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';
import { File } from 'src/file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specie, Film, People, File])],
  controllers: [SpecieController],
  providers: [SpecieRepository, SpecieService],
  exports: [SpecieRepository],
})
export class SpecieModule {}
