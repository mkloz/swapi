import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceRepository } from '../common/resource.repository';
import { Repository } from 'typeorm';
import { Film } from '../film/film.entity';
import { Planet } from '../planet/planet.entity';
import { Specie } from '../specie/specie.entity';
import { Starship } from '../starship/starship.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { IDiscriptionsPeople, IRelationsIDPeople } from './people.interface';
import { People } from './people.entity';
import { File } from 'src/file/file.entity';

@Injectable()
export class PeopleRepository extends ResourceRepository<
  People,
  IDiscriptionsPeople,
  IRelationsIDPeople
> {
  constructor(
    @InjectRepository(People)
    ormPeopleRepo: Repository<People>,
    @InjectRepository(Planet)
    private readonly planetRepo: Repository<Planet>,
    @InjectRepository(Specie)
    private readonly specieRepo: Repository<Specie>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @InjectRepository(Starship)
    private readonly starshipRepo: Repository<Starship>,
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
  ) {
    super(ormPeopleRepo, [
      'homeworld',
      'species',
      'starships',
      'vehicles',
      'files',
    ]);
  }

  async addRelations(ent: People, rel: Partial<IRelationsIDPeople>) {
    ent.films = rel.films
      ? await this.getExistingEntity(this.filmRepo, rel.films)
      : [];
    if (rel.homeworld) {
      ent.homeworld = (
        await this.getExistingEntity(this.planetRepo, [rel.homeworld])
      )[0];
    }
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
    if (rel.files) {
      ent.files = await this.getExistingEntity(this.fileRepo, rel.files);
    }
    return ent;
  }
}
