import { Injectable } from '@nestjs/common';
import { ResourceService } from '../common/resource.service';
import { IDiscriptionsPlanet, IRelationsPlanet } from './planet.interface';
import { Planet } from './planet.entity';
import { PlanetRepository } from './planet.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlanetService extends ResourceService<
  Planet,
  IDiscriptionsPlanet,
  Record<keyof IRelationsPlanet, number[]>
> {
  public constructor(
    planetRepo: PlanetRepository,
    configService: ConfigService,
  ) {
    super(configService, planetRepo);
  }
}
