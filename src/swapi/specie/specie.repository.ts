import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceRepository } from '../common/resource.repository';
import { Repository } from 'typeorm';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';
import { IDiscriptionsSpecie, IRelationsSpecie } from './specie.interface';
import { Specie } from './specie.entity';
import { File } from 'src/file/file.entity';

@Injectable()
export class SpecieRepository extends ResourceRepository<
  Specie,
  IDiscriptionsSpecie,
  Record<keyof IRelationsSpecie, number[]>
> {
  constructor(
    @InjectRepository(Specie)
    ormSpecieRepo: Repository<Specie>,
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
    @InjectRepository(People)
    private readonly peopleRepo: Repository<People>,
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
  ) {
    super(ormSpecieRepo, ['films', 'people', 'files']);
  }

  async addRelations(
    ent: Specie,
    rel: Partial<Record<keyof IRelationsSpecie, number[]>>,
  ) {
    if (rel.films) {
      ent.films = await this.getExistingEntity(this.filmRepo, rel.films);
    }
    if (rel.people) {
      ent.people = await this.getExistingEntity(this.peopleRepo, rel.people);
    }
    if (rel.files) {
      ent.files = await this.getExistingEntity(this.fileRepo, rel.files);
    }
    return ent;
  }
}
