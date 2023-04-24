import { Injectable } from '@nestjs/common';
import { ResourceService } from '../common/resource.service';
import {
  IDiscriptionsStarship,
  IRelationsStarship,
} from './starship.interface';
import { Starship } from './starship.entity';
import { StarshipRepository } from './starship.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StarshipService extends ResourceService<
  Starship,
  IDiscriptionsStarship,
  Record<keyof IRelationsStarship, number[]>
> {
  constructor(starshipRepo: StarshipRepository, configService: ConfigService) {
    super(configService, starshipRepo);
  }
}
