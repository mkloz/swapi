import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceRepository } from '../common/resource.repository';
import { Repository } from 'typeorm';
import { People } from '../people/people.entity';
import { Planet } from '../planet/planet.entity';
import { Specie } from '../specie/specie.entity';
import { Starship } from '../starship/starship.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { IDiscriptionsFilm, IRelationsFilm } from './film.interface';
import { Film } from './film.entity';
import { File } from '../../file/file.entity';

@Injectable()
export class FilmRepository extends ResourceRepository<
  Film,
  IDiscriptionsFilm,
  Record<keyof IRelationsFilm, number[]>
> {
  constructor(
    @InjectRepository(Film)
    ormFilmRepo: Repository<Film>,
    @InjectRepository(People)
    private readonly peopleRepo: Repository<People>,
    @InjectRepository(Planet)
    private readonly planetRepo: Repository<Planet>,
    @InjectRepository(Specie)
    private readonly specieRepo: Repository<Specie>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @InjectRepository(Starship)
    private readonly starshipRepo: Repository<Starship>,
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
  ) {
    super(ormFilmRepo, [
      'planets',
      'species',
      'characters',
      'starships',
      'vehicles',
      'files',
    ]);
  }

  async addRelations(
    ent: Film,
    rel: Partial<Record<keyof IRelationsFilm, number[]>>,
  ): Promise<Film> {
    if (rel.species) {
      ent.species = await this.getExistingEntity(this.specieRepo, rel.species);
    }
    if (rel.starships) {
      ent.starships = await this.getExistingEntity(
        this.starshipRepo,
        rel.starships,
      );
    }
    if (rel.vehicles) {
      ent.vehicles = await this.getExistingEntity(
        this.vehicleRepo,
        rel.vehicles,
      );
    }
    if (rel.characters) {
      ent.characters = await this.getExistingEntity(
        this.peopleRepo,
        rel.characters,
      );
    }
    if (rel.planets) {
      ent.planets = await this.getExistingEntity(this.planetRepo, rel.planets);
    }
    if (rel.files) {
      ent.files = await this.getExistingEntity(this.fileRepo, rel.files);
    }
    return ent;
  }
}
