import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceRepository } from '../common/resource.repository';
import { Repository } from 'typeorm';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';
import { Vehicle } from './vehicle.entity';
import { File } from 'src/file/file.entity';
import { IDiscriptionsVehicle, IRelationsVehicle } from './vehicle.interface';

@Injectable()
export class VehicleRepository extends ResourceRepository<
  Vehicle,
  IDiscriptionsVehicle,
  Record<keyof IRelationsVehicle, number[]>
> {
  constructor(
    @InjectRepository(Vehicle)
    ormVehicleRepo: Repository<Vehicle>,
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
    @InjectRepository(People)
    private readonly peopleRepo: Repository<People>,
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
  ) {
    super(ormVehicleRepo, ['films', 'pilots', 'files']);
  }

  public async addRelations(
    ent: Vehicle,
    rel: Partial<Record<keyof IRelationsVehicle, number[]>>,
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
