import { Injectable } from '@nestjs/common';
import { FilmRepository } from './film.repository';
import { ResourceService } from '../common/resource.service';
import { IDiscriptionsFilm, IRelationsFilm } from './film.interface';
import { Film } from './film.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilmService extends ResourceService<
  Film,
  IDiscriptionsFilm,
  Record<keyof IRelationsFilm, number[]>
> {
  constructor(filmRepository: FilmRepository, configService: ConfigService) {
    super(configService, filmRepository);
  }
}
