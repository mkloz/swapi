import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceRepository } from '../common/resource.repository';
import { Repository } from 'typeorm';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';
import {
  IDiscriptionsStarship,
  IRelationsStarship,
} from './starship.interface';
import { Starship } from './starship.entity';
import { File } from 'src/file/file.entity';

@Injectable()
export class StarshipRepository extends ResourceRepository<
  Starship,
  IDiscriptionsStarship,
  Record<keyof IRelationsStarship, number[]>
> {
  public constructor(
    @InjectRepository(Starship)
    ormStarshipRepo: Repository<Starship>,
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
    @InjectRepository(People)
    private readonly peopleRepo: Repository<People>,
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
  ) {
    super(ormStarshipRepo, ['films', 'pilots', 'files']);
  }

  public async addRelations(
    ent: Starship,
    rel: Partial<Record<keyof IRelationsStarship, number[]>>,
  ) {
    if (rel.films) {
      ent.films = await this.getExistingEntity(this.filmRepo, rel.films);
    }
    if (rel.pilots) {
      ent.pilots = await this.getExistingEntity(this.peopleRepo, rel.pilots);
    }
    if (rel.files) {
      ent.files = await this.getExistingEntity(this.fileRepo, rel.files);
    }
    return ent;
  }
}
