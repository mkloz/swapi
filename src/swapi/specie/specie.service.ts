import { Injectable } from '@nestjs/common';
import { ResourceService } from '../common/resource.service';
import { Specie } from './specie.entity';
import { SpecieRepository } from './specie.repository';
import { IDiscriptionsSpecie, IRelationsSpecie } from './specie.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpecieService extends ResourceService<
  Specie,
  IDiscriptionsSpecie,
  Record<keyof IRelationsSpecie, number[]>
> {
  constructor(specieRepo: SpecieRepository, configService: ConfigService) {
    super(configService, specieRepo);
  }
}
